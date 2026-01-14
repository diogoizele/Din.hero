#!/usr/bin/env bash
set -e

PLIST_PATH="ios/GoogleService-Info.plist"

if [ -f "$PLIST_PATH" ]; then
  echo "GoogleService-Info.plist já existe"
  exit 0
fi

if [ -z "$IOS_GOOGLE_SERVICES_PLIST_BASE64" ]; then
  echo "Firebase iOS desabilitado: plist não encontrado"
  exit 0
fi

echo "$IOS_GOOGLE_SERVICES_PLIST_BASE64" | base64 --decode > "$PLIST_PATH"
echo "GoogleService-Info.plist gerado via Base64"
