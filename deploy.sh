#!/bin/bash
# =============================================================================
# Navkar Marriage Bureau — Hostinger Deployment Script
# Run this ONCE on the server after cloning the repo.
# Usage:  bash deploy.sh
# =============================================================================

set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${GREEN}[INFO]${NC}  $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

echo ""
echo "  ┌──────────────────────────────────────────┐"
echo "  │   Navkar Marriage Bureau — Deploy Script  │"
echo "  └──────────────────────────────────────────┘"
echo ""

# ── 1. PHP version check ──────────────────────────────────────────────────────
info "Checking PHP version..."
PHP_VER=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
if [[ $(php -r "echo version_compare(PHP_VERSION,'8.2','>=') ? 1 : 0;") -eq 0 ]]; then
    error "PHP 8.2+ required. Current: $PHP_VER"
fi
info "PHP $PHP_VER ✓"

# ── 2. Composer install ───────────────────────────────────────────────────────
info "Installing Composer dependencies (production)..."
composer install --no-dev --optimize-autoloader --no-interaction
info "Composer done ✓"

# ── 3. .env setup ────────────────────────────────────────────────────────────
if [ ! -f ".env" ]; then
    cp .env.example .env
    warn ".env created from .env.example — please fill in DB credentials and APP_URL before continuing."
    warn "Edit the file now:  nano .env"
    echo ""
    read -p "Press ENTER after you have filled in .env to continue..." _
fi
info ".env present ✓"

# ── 4. App key ────────────────────────────────────────────────────────────────
if grep -q "^APP_KEY=$" .env; then
    info "Generating app key..."
    php artisan key:generate
fi
info "App key ✓"

# ── 5. Directory permissions ──────────────────────────────────────────────────
info "Setting directory permissions..."
chmod -R 775 storage bootstrap/cache
mkdir -p public/storage/images
chmod -R 775 public/storage
info "Permissions ✓"

# ── 6. Migrate + seed ─────────────────────────────────────────────────────────
info "Running database migrations and seeders..."
php artisan migrate --seed --force
info "Database ready ✓"

# ── 7. Optimise for production ────────────────────────────────────────────────
info "Caching config, routes and views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
info "Cache optimised ✓"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}  ✅  Deployment complete!${NC}"
echo ""
echo "  Next step in Hostinger hPanel:"
echo "  → Websites → your domain → Manage → PHP → Web root"
echo "  → Change to:  $(pwd)/public"
echo ""
echo "  Admin login:"
echo "  → URL:      https://yourdomain.com/admin/login"
echo "  → Email:    admin@navkarmarriage.com"
echo "  → Password: Admin@1234  ← CHANGE THIS IMMEDIATELY in admin settings"
echo ""
