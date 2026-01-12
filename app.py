from flask import Flask
from auth.routes import auth_bp
from products.routes import products_bp
from downloads.routes import downloads_bp

app = Flask(__name__)
app.secret_key = "super-secret-key"  # move to env later

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(products_bp)
app.register_blueprint(downloads_bp)

if __name__ == "__main__":
    app.run(debug=True)
