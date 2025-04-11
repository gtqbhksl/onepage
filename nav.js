document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    let isMouseInNav = false;

    // 处理滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            nav.classList.add('visible');
        } else if (!isMouseInNav) {
            nav.classList.remove('visible');
        }
    });

    // 处理鼠标进入顶部区域
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 100) {
            nav.classList.add('visible');
        } else if (!isMouseInNav && window.scrollY >= 100) {
            nav.classList.remove('visible');
        }
    });

    // 处理导航栏自身鼠标事件
    nav.addEventListener('mouseenter', () => {
        isMouseInNav = true;
        nav.classList.add('visible');
    });

    nav.addEventListener('mouseleave', () => {
        isMouseInNav = false;
        if (window.scrollY >= 100) {
            nav.classList.remove('visible');
        }
    });
});
function toggleArticle(button) {
    const articleItem = button.closest('.article-item');
    articleItem.classList.toggle('expanded');
    button.querySelector('span').textContent = articleItem.classList.contains('expanded') ? '收起内容' : '展开内容';
}

let currentPage = 1;
const itemsPerPage = 3;

function initPagination() {
    const articles = document.querySelectorAll('.article-item');
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    
    document.getElementById('page-numbers').innerHTML = Array
        .from({length: totalPages}, (_, i) => `<button class="page-btn ${i+1 === currentPage ? 'active' : ''}" onclick="goToPage(${i+1})">${i+1}</button>`)
        .join('');
    
    updateArticleVisibility();
}

function updateArticleVisibility() {
    document.querySelectorAll('.article-item').forEach((item, index) => {
        item.style.display = (index >= (currentPage-1)*itemsPerPage && index < currentPage*itemsPerPage) ? 'block' : 'none';
    });
}

function goToPage(page) {
    currentPage = page;
    initPagination();
}

function changePage(step) {
    currentPage = Math.max(1, currentPage + step);
    initPagination();
}