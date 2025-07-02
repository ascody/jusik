from flask import Blueprint, render_template,request,jsonify

from services.data_provider import search_stock

home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def home():
    return render_template('home.html')

@home_bp.route('/autocomplete')
def autocomplete():
    q = request.args.get('q', "").strip().lower()
    if not q:
        return jsonify([])
    stocks = search_stock(q)
    return jsonify(stocks[:10])

@home_bp.route('/search')
def search():
    q = request.args.get('q', "").strip().lower()
    if not q:
        return jsonify({'error': '검색어를 입력해주세요.'}), 400
    stocks = search_stock(q)
    return jsonify(stocks)