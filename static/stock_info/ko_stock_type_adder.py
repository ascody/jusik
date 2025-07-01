# import json

# with open("static/stock_info/kosdaq_code.json", "r", encoding="utf-8") as f:
#     kosdaq_list = json.load(f)
#     for stock in kosdaq_list:
#         stock["마켓"] = "KOSDAQ"
#     with open("static/stock_info/kosdaq_code_with_market.json", "w", encoding="utf-8") as f:
#         json.dump(kosdaq_list, f, ensure_ascii=False, indent=2)

# with open("static/stock_info/kospi_code.json", "r", encoding="utf-8") as f:
#     kospi_list = json.load(f)
#     for stock in kospi_list:
#         stock["마켓"] = "KOSPI"
#     with open("static/stock_info/kospi_code.json", "w", encoding="utf-8") as f:
#         json.dump(kospi_list, f, ensure_ascii=False, indent=2)
    