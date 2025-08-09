#!/usr/bin/env python3
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Read name from argv or input
if len(sys.argv) > 1:
    name = sys.argv[1].strip()
    print(f"🚀 Using project name from args: {name}")
else:
    name = input("📦 Enter project name: ").strip()

# Validate name
if not re.match(r"^[A-Za-z0-9_-]+$", name):
    print("❓ Invalid name. Only letters, digits, '-' and '_' are allowed.")
    exit(1)

target_dir = ROOT / "videos" / name
if target_dir.exists():
    print(f"❌ Directory already exists: {target_dir}")
    exit(1)

# Create required directories
print("📂 Creating directories...")
(target_dir / "public").mkdir(parents=True)
(target_dir / "src").mkdir(parents=True)

# Copy files from demo
origin_dir = ROOT / "videos" / "demo"
files_to_copy = [
    "src/index.ts",
    "package.json",
    "remotion.config.ts",
    "tsconfig.json",
]
print("📄 Copying template files...")
for file in files_to_copy:
    shutil.copy2(origin_dir / file, target_dir / file)

# Replace "demo" with project name in package.json
print("🛠️ Updating package.json...")
package_path = target_dir / "package.json"
package_content = package_path.read_text(encoding="utf-8")
package_content = package_content.replace("demo", name)
package_path.write_text(package_content, encoding="utf-8")

# Install dependencies
print("📦 Installing dependencies via pnpm...")
subprocess.run(["pnpm", "--filter", name, "install"], cwd=ROOT, check=True, shell=True)

print(f"✅ Project '{name}' created successfully at {target_dir}")
