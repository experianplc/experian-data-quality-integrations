mkdir experian-data-quality_checkout-1.x
mkdir experian-data-quality_checkout-1.x/Checkout
cp -rf lib/Experian/Checkout/* experian-data-quality_checkout-1.x/Checkout
cp -rf src/Experian/Checkout/* experian-data-quality_checkout-1.x/Checkout
find experian-data-quality_checkout-1.x/ -name "*.js.map" -type f -delete
find experian-data-quality_checkout-1.x/ -name "*.ts" -type f -delete
