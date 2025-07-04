from .home import home_bp
from .portfolio import portfolio_bp
# from .settings import settings_bp

def register_routes(app):
    app.register_blueprint(home_bp, url_prefix='/')
    app.register_blueprint(portfolio_bp, url_prefix='/portfolio')
    # app.register_blueprint(settings_bp, url_prefix='/settings')