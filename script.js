document.addEventListener('DOMContentLoaded', function() {
    // 页面加载完成后隐藏加载动画
    setTimeout(function() {
        document.querySelector('.page-loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.page-loader').style.display = 'none';
        }, 500);
    }, 1000);
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 汉堡菜单
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }
    
    // 导航链接点击
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            
            // 设置活动链接
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 打字效果
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const words = ['专业人士', '热爱生活', '终身学习者', '创新思考者'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 80;
            } else {
                typedText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1000; // 等待一段时间再删除
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    // 数字增长动画
    const numberElements = document.querySelectorAll('.number');
    const animateNumbers = () => {
        numberElements.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const increment = target / 50;
            let current = 0;
            
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    number.textContent = Math.min(Math.ceil(current), target);
                    requestAnimationFrame(updateNumber);
                }
            };
            
            updateNumber();
        });
    };
    
    // 技能标签切换
    const categoryTabs = document.querySelectorAll('.category-tab');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 更新活动标签
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新活动类别
            skillCategories.forEach(cat => cat.classList.remove('active'));
            document.getElementById(category).classList.add('active');
            
            // 重新触发技能条动画
            const skills = document.querySelectorAll(`#${category} .skill-level`);
            skills.forEach(skill => {
                const width = skill.style.width;
                skill.style.width = '0';
                setTimeout(() => {
                    skill.style.width = width;
                }, 50);
            });
        });
    });
    
    // 滚动动画
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                // 获取延迟
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('active');
                }, delay);
            }
        });
        
        // 技能条动画
        const skillElements = document.querySelectorAll('.skill-level');
        skillElements.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            if (skillTop < windowHeight - 100) {
                const width = skill.getAttribute('style') ? skill.getAttribute('style').split('width:')[1].split(';')[0].trim() : '';
                if (width && skill.style.width === '0px') {
                    skill.style.width = width;
                }
            }
        });
        
        // 当页面滚动到一定位置时，显示回到顶部按钮
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
    
    // 回到顶部按钮
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 初始化动画
    checkReveal();
    window.addEventListener('scroll', checkReveal);
    
    // 当进入关于我部分时触发数字动画
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
    
    // 设置当前年份
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // 表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加表单处理逻辑，例如AJAX提交等
            alert('感谢您的留言！我会尽快回复您。');
            contactForm.reset();
        });
    }
    
    // 页面内平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const yOffset = -80; // 导航栏高度
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 