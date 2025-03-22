import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time
import os
import json
from urllib.parse import urljoin, quote
import random
import re

def get_document_content(title, keywords):
    """
    直接获取文档内容
    """
    # 使用更准确的URL格式
    search_urls = [
        f"http://www.gov.cn/zhengce/content/{quote(title)}",
        f"http://www.xinhuanet.com/politics/{quote(title)}",
        f"http://www.people.com.cn/politics/{quote(title)}",
        f"http://www.qstheory.cn/dukan/qs/{quote(title)}",
        f"http://theory.people.com.cn/n1/{quote(title)}"
    ]
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Connection": "keep-alive",
        "Referer": "http://www.gov.cn/",
        "Cookie": "BAIDUID=random; BIDUPSID=random; PSTM=random"
    }
    
    # 定义内容选择器
    content_selectors = [
        'div.article-content',
        'div.content',
        'div.main-content',
        'div.article',
        'div.text-content',
        'div.detail-content',
        'div.article-body',
        'div.main-text',
        'div.text'
    ]
    
    # 首先尝试直接访问
    for url in search_urls:
        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 尝试不同的内容选择器
            for selector in content_selectors:
                content = soup.select_one(selector)
                if content:
                    # 清理内容
                    text = content.get_text()
                    text = re.sub(r'\s+', ' ', text).strip()
                    if len(text) > 100:  # 确保内容足够长
                        return text
            
            # 如果没找到内容，尝试查找PDF链接
            pdf_links = soup.find_all('a', href=re.compile(r'\.pdf$'))
            if pdf_links:
                pdf_url = pdf_links[0]['href']
                if not pdf_url.startswith('http'):
                    pdf_url = urljoin(url, pdf_url)
                pdf_response = requests.get(pdf_url, headers=headers, timeout=10)
                pdf_response.raise_for_status()
                return pdf_response.text
            
            # 随机延时
            time.sleep(random.uniform(1, 2))
            
        except Exception as e:
            print(f"访问 {url} 出错: {str(e)}")
            continue
    
    # 如果直接访问失败，尝试使用百度搜索
    search_url = f"https://www.baidu.com/s?wd={quote(title)} {quote(keywords)} site:gov.cn OR site:xinhuanet.com OR site:people.com.cn"
    try:
        response = requests.get(search_url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for result in soup.find_all('div', class_='result'):
            link = result.find('a')
            if link:
                doc_url = link['href']
                try:
                    doc_response = requests.get(doc_url, headers=headers, timeout=10)
                    doc_response.raise_for_status()
                    doc_soup = BeautifulSoup(doc_response.text, 'html.parser')
                    
                    # 尝试提取内容
                    for selector in content_selectors:
                        content = doc_soup.select_one(selector)
                        if content:
                            text = content.get_text()
                            text = re.sub(r'\s+', ' ', text).strip()
                            if len(text) > 100:
                                return text
                except Exception as e:
                    print(f"访问搜索结果页面出错: {str(e)}")
                    continue
    
    except Exception as e:
        print(f"百度搜索出错: {str(e)}")
    
    return None

def save_document(content, title):
    """
    保存文档内容
    """
    if not os.path.exists('documents'):
        os.makedirs('documents')
    
    safe_title = "".join(x for x in title if x.isalnum() or x in (' ', '-', '_'))
    file_path = os.path.join('documents', f'{safe_title}.txt')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(f"标题：{title}\n\n")
        f.write(content)
    
    return file_path

def main():
    # 定义要获取的文档列表
    documents = [
        {
            "title": "习近平新时代中国特色社会主义思想概论",
            "keywords": "高等教育出版社 人民出版社 2023年",
            "source": "高等教育出版社、人民出版社"
        },
        {
            "title": "高举中国特色社会主义伟大旗帜 为全面建设社会主义现代化国家而团结奋斗",
            "keywords": "党的二十大报告",
            "source": "党的二十大报告"
        },
        {
            "title": "政府工作报告",
            "keywords": "第十四届全国人民代表大会第三次会议",
            "source": "第十四届全国人民代表大会第三次会议"
        },
        {
            "title": "教育强国建设规划纲要",
            "keywords": "2024-2035年",
            "source": "中共中央、国务院"
        },
        {
            "title": "在党的二十届三中全会第二次全体会议上的讲话",
            "keywords": "习近平",
            "source": "习近平"
        },
        {
            "title": "经济工作必须统筹好几对重要关系",
            "keywords": "习近平",
            "source": "习近平"
        },
        {
            "title": "进一步全面深化改革中的几个重大理论和实践问题",
            "keywords": "习近平",
            "source": "习近平"
        }
    ]
    
    results = []
    
    for doc in documents:
        print(f"正在获取: {doc['title']}")
        content = get_document_content(doc['title'], doc['keywords'])
        
        if content:
            file_path = save_document(content, doc['title'])
            results.append({
                '文档名称': doc['title'],
                '来源': doc['source'],
                '保存路径': file_path,
                '状态': '成功'
            })
            print(f"成功获取: {doc['title']}")
        else:
            results.append({
                '文档名称': doc['title'],
                '来源': doc['source'],
                '保存路径': '',
                '状态': '未找到'
            })
            print(f"未找到: {doc['title']}")
        
        # 随机延时
        time.sleep(random.uniform(2, 4))
    
    # 保存结果到Excel
    df = pd.DataFrame(results)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    df.to_excel(f'search_results_{timestamp}.xlsx', index=False)
    print(f"结果已保存到 search_results_{timestamp}.xlsx")

if __name__ == "__main__":
    main() 