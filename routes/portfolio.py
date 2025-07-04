from flask import Blueprint, render_template,request,jsonify

portfolio_bp = Blueprint('portfolio', __name__)

@portfolio_bp.route('/')
def portfolio():
    return render_template('portfolio.html')