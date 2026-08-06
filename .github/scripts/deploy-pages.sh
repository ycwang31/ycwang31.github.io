#!/usr/bin/env bash

set -euo pipefail

repository_root="$(git rev-parse --show-toplevel)"
cd "${repository_root}"

if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "Deploy from the main branch only." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Commit or discard local changes before deployment." >&2
  exit 1
fi

git push origin main
gh workflow run deploy-pages.yml \
  --repo ycwang31/ycwang31.github.io \
  --ref main

echo "Deployment requested: https://github.com/ycwang31/ycwang31.github.io/actions"
