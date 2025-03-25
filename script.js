document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded');

    // 隐藏加载动画
    setTimeout(function() {
        document.querySelector('.loader-wrapper').classList.add('hidden');
    }, 800);

    // 计算工作年限和年龄
    const calculateYearsAndAge = () => {
        // 工作年限计算 (从2022年至今)
        const startYear = 2022;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // JavaScript月份从0开始
        
        let workYears = currentYear - startYear;
        
        // 如果当前还不到一整年，显示为0+
        if (workYears < 1) {
            workYears = "0+";
        }
        
        // 设置工作年限data-target属性
        const workYearsElement = document.getElementById('work-years');
        if (workYearsElement) {
            workYearsElement.setAttribute('data-target', typeof workYears === 'string' ? 0 : workYears);
            if (typeof workYears === 'string') {
                // 如果是"0+"这种格式，计数完成后再设置
                setTimeout(() => {
                    workYearsElement.textContent = workYears;
                }, 1500);
            }
        }
        
        // 年龄计算 (出生日期: 2002年2月1日)
        const birthYear = 2002;
        const birthMonth = 2;
        const birthDay = 1;
        
        let age = currentYear - birthYear;
        
        // 如果今年的生日还没到，年龄减1
        if (currentMonth < birthMonth || (currentMonth === birthMonth && new Date().getDate() < birthDay)) {
            age--;
        }
        
        // 如果超出整岁，显示为年龄+
        const birthday = new Date(currentYear, birthMonth - 1, birthDay);
        const today = new Date();
        const hasBirthdayPassed = today > birthday && today.getMonth() !== birthday.getMonth();
        
        let ageDisplay = age;
        if (hasBirthdayPassed) {
            ageDisplay = age + "+";
        }
        
        // 设置年龄data-target属性
        const ageElement = document.getElementById('age');
        if (ageElement) {
            ageElement.setAttribute('data-target', age);
            if (hasBirthdayPassed) {
                // 如果是有"+"的格式，计数完成后再添加"+"
                setTimeout(() => {
                    ageElement.textContent = ageDisplay;
                }, 1500);
            }
        }
    };

    // 调用函数计算年龄和工作年限
    calculateYearsAndAge();

    // 导航条滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 汉堡菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.id !== 'admin-link') {
            link.addEventListener('click', function(e) {
                // 移除所有active类
                navLinks.forEach(item => item.classList.remove('active'));
                // 添加active类到当前点击的链接
                this.classList.add('active');
                
                // 如果是移动端，点击后关闭菜单
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
    });

    // 打字效果
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const words = ['Web开发者', '设计师', '创意工作者'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // 删除字符
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // 添加字符
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            // 如果完成一个单词的输入，开始删除
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1000; // 暂停一会儿再开始删除
            } 
            // 如果删除完毕，切换到下一个单词
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            setTimeout(type, typingSpeed);
        }

        // 启动打字效果
        setTimeout(type, 1000);
    }

    // 数字计数动画
    const counters = document.querySelectorAll('.counter');
    const counterSpeed = 200; // 计数速度越低越快
    
    function startCounting() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / counterSpeed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(startCounting, 10);
            } else {
                counter.innerText = target;
            }
        });
    }

    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 滚动时检查是否开始计数
    let countStarted = false;
    window.addEventListener('scroll', function() {
        if (!countStarted && document.querySelector('.about-stats') && isInViewport(document.querySelector('.about-stats'))) {
            countStarted = true;
            startCounting();
        }
    });

    // 技能标签切换
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有active类
            tabItems.forEach(item => item.classList.remove('active'));
            // 隐藏所有内容
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 添加active类到当前点击的标签
            this.classList.add('active');
            // 显示对应内容
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // 滚动显示动画
    const revealElements = document.querySelectorAll('.section-header, .about-image, .about-text, .skill-item, .project-card, .contact-item');
    
    function revealOnScroll() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // 初始检查

    // 回到顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 更新页脚年份
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 表单提交
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('您的留言已收到，我会尽快回复！');
            messageForm.reset();
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (this.getAttribute('href') !== '#' && this.getAttribute('id') !== 'admin-link') {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 管理员面板功能
    const adminLink = document.getElementById('admin-link');
    const adminModal = document.getElementById('admin-modal');
    const adminPanel = document.getElementById('admin-panel');
    const adminForm = document.getElementById('admin-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminCloseButton = document.getElementById('admin-close');
    const modalClose = document.querySelector('.close');
    
    // 打开管理员登录模态框
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            adminModal.style.display = 'block';
        });
    }
    
    // 关闭模态框
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            adminModal.style.display = 'none';
        });
    }
    
    // 关闭管理面板
    if (adminCloseButton) {
        adminCloseButton.addEventListener('click', function() {
            adminPanel.style.display = 'none';
        });
    }
    
    // 管理员登录验证
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            
            // 检查密码是否正确（实际应用中应该使用安全的验证方法）
            if (password === 'admin123') {
                // 隐藏登录模态框，显示管理面板
                adminModal.style.display = 'none';
                adminPanel.style.display = 'block';
            } else {
                alert('密码错误，请重试');
            }
        });
    }
    
    // 管理面板菜单切换
    const adminMenuItems = document.querySelectorAll('.admin-menu li');
    adminMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active类
            adminMenuItems.forEach(menuItem => menuItem.classList.remove('active'));
            // 隐藏所有内容
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // 添加active类到当前点击的菜单项
            this.classList.add('active');
            // 显示对应内容
            const target = this.getAttribute('data-section');
            document.getElementById(target + '-section').classList.add('active');
        });
    });
    
    // 添加技术技能
    const addTechSkillButton = document.getElementById('add-tech-skill');
    if (addTechSkillButton) {
        addTechSkillButton.addEventListener('click', function() {
            const container = document.getElementById('technical-skills-container');
            const skillEntry = document.createElement('div');
            skillEntry.className = 'skill-entry';
            
            const uniqueId = Date.now();
            skillEntry.innerHTML = `
                <input type="text" name="tech-skill-name-${uniqueId}" placeholder="技能名称">
                <input type="range" name="tech-skill-level-${uniqueId}" min="0" max="100" value="75">
                <span class="skill-value">75%</span>
                <button type="button" class="remove-skill">移除</button>
            `;
            
            // 在按钮前插入新技能
            container.insertBefore(skillEntry, addTechSkillButton);
            
            // 添加范围滑块事件
            const rangeInput = skillEntry.querySelector('input[type="range"]');
            const valueDisplay = skillEntry.querySelector('.skill-value');
            
            rangeInput.addEventListener('input', function() {
                valueDisplay.textContent = this.value + '%';
            });
            
            // 添加移除按钮事件
            const removeButton = skillEntry.querySelector('.remove-skill');
            removeButton.addEventListener('click', function() {
                container.removeChild(skillEntry);
            });
        });
    }
    
    // 添加软技能（与技术技能类似）
    const addSoftSkillButton = document.getElementById('add-soft-skill');
    if (addSoftSkillButton) {
        addSoftSkillButton.addEventListener('click', function() {
            const container = document.getElementById('soft-skills-container');
            const skillEntry = document.createElement('div');
            skillEntry.className = 'skill-entry';
            
            const uniqueId = Date.now();
            skillEntry.innerHTML = `
                <input type="text" name="soft-skill-name-${uniqueId}" placeholder="技能名称">
                <input type="range" name="soft-skill-level-${uniqueId}" min="0" max="100" value="75">
                <span class="skill-value">75%</span>
                <button type="button" class="remove-skill">移除</button>
            `;
            
            container.insertBefore(skillEntry, addSoftSkillButton);
            
            const rangeInput = skillEntry.querySelector('input[type="range"]');
            const valueDisplay = skillEntry.querySelector('.skill-value');
            
            rangeInput.addEventListener('input', function() {
                valueDisplay.textContent = this.value + '%';
            });
            
            const removeButton = skillEntry.querySelector('.remove-skill');
            removeButton.addEventListener('click', function() {
                container.removeChild(skillEntry);
            });
        });
    }
    
    // 添加项目
    const addProjectButton = document.getElementById('add-project');
    if (addProjectButton) {
        addProjectButton.addEventListener('click', function() {
            const container = document.getElementById('projects-container');
            const projectEntry = document.createElement('div');
            projectEntry.className = 'project-entry';
            
            projectEntry.innerHTML = `
                <div class="form-group">
                    <label>项目标题</label>
                    <input type="text" name="project-title" placeholder="项目标题">
                </div>
                <div class="form-group">
                    <label>项目描述</label>
                    <textarea name="project-desc" placeholder="项目描述"></textarea>
                </div>
                <div class="form-group">
                    <label>项目图片</label>
                    <input type="file" name="project-image">
                </div>
                <div class="form-group">
                    <label>技术标签 (逗号分隔)</label>
                    <input type="text" name="project-tags" placeholder="例如: HTML, CSS, JavaScript">
                </div>
                <div class="form-group">
                    <label>项目链接</label>
                    <input type="text" name="project-link" placeholder="项目URL">
                </div>
                <div class="form-group">
                    <label>Github链接</label>
                    <input type="text" name="project-github" placeholder="Github URL">
                </div>
                <button type="button" class="remove-project btn btn-outline btn-sm">移除项目</button>
            `;
            
            container.appendChild(projectEntry);
            
            const removeButton = projectEntry.querySelector('.remove-project');
            removeButton.addEventListener('click', function() {
                container.removeChild(projectEntry);
            });
        });
    }
    
    // 添加社交媒体
    const addSocialButton = document.getElementById('add-social');
    if (addSocialButton) {
        addSocialButton.addEventListener('click', function() {
            const container = document.getElementById('social-container');
            const socialEntry = document.createElement('div');
            socialEntry.className = 'social-entry';
            
            socialEntry.innerHTML = `
                <select name="social-platform">
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                </select>
                <input type="text" name="social-link" placeholder="链接URL">
                <button type="button" class="remove-social">移除</button>
            `;
            
            container.insertBefore(socialEntry, addSocialButton);
            
            const removeButton = socialEntry.querySelector('.remove-social');
            removeButton.addEventListener('click', function() {
                container.removeChild(socialEntry);
            });
        });
    }
    
    // 现有范围滑块事件
    document.querySelectorAll('input[type="range"]').forEach(range => {
        range.addEventListener('input', function() {
            const valueDisplay = this.nextElementSibling;
            if (valueDisplay && valueDisplay.classList.contains('skill-value')) {
                valueDisplay.textContent = this.value + '%';
            }
        });
    });
    
    // 管理员表单提交
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 收集表单数据
            const formData = new FormData(adminForm);
            
            // 收集技术技能数据
            const technicalSkills = [];
            document.querySelectorAll('#technical-skills-container .skill-entry').forEach(entry => {
                const nameInput = entry.querySelector('input[type="text"]');
                const levelInput = entry.querySelector('input[type="range"]');
                
                if (nameInput && levelInput && nameInput.value.trim() !== '') {
                    technicalSkills.push({
                        id: nameInput.name.replace('tech-skill-name-', ''),
                        name: nameInput.value,
                        level: parseInt(levelInput.value)
                    });
                }
            });
            
            // 收集软技能数据
            const softSkills = [];
            document.querySelectorAll('#soft-skills-container .skill-entry').forEach(entry => {
                const nameInput = entry.querySelector('input[type="text"]');
                const levelInput = entry.querySelector('input[type="range"]');
                
                if (nameInput && levelInput && nameInput.value.trim() !== '') {
                    softSkills.push({
                        id: nameInput.name.replace('soft-skill-name-', ''),
                        name: nameInput.value,
                        level: parseInt(levelInput.value)
                    });
                }
            });
            
            // 将技能数据添加到表单数据
            formData.append('technical-skills', JSON.stringify(technicalSkills));
            formData.append('soft-skills', JSON.stringify(softSkills));
            
            // 收集项目数据
            const projects = [];
            document.querySelectorAll('#projects-container .project-entry').forEach(entry => {
                const titleInput = entry.querySelector('input[name="project-title"]');
                const descInput = entry.querySelector('textarea[name="project-desc"]');
                const tagsInput = entry.querySelector('input[name="project-tags"]');
                const linkInput = entry.querySelector('input[name="project-link"]');
                const githubInput = entry.querySelector('input[name="project-github"]');
                
                if (titleInput && descInput && titleInput.value.trim() !== '') {
                    projects.push({
                        title: titleInput.value,
                        description: descInput.value,
                        tags: tagsInput ? tagsInput.value.split(',').map(tag => tag.trim()) : [],
                        link: linkInput ? linkInput.value : '',
                        github: githubInput ? githubInput.value : ''
                    });
                }
            });
            
            // 将项目数据添加到表单数据
            formData.append('projects', JSON.stringify(projects));
            
            // 收集社交媒体数据
            const socialMedia = [];
            document.querySelectorAll('#social-container .social-entry').forEach(entry => {
                const platformSelect = entry.querySelector('select[name="social-platform"]');
                const linkInput = entry.querySelector('input[name="social-link"]');
                
                if (platformSelect && linkInput && linkInput.value.trim() !== '') {
                    socialMedia.push({
                        platform: platformSelect.value,
                        link: linkInput.value
                    });
                }
            });
            
            // 将社交媒体数据添加到表单数据
            formData.append('social-media', JSON.stringify(socialMedia));
            
            // 提交到服务器（实际应用中这里应该有一个AJAX请求）
            console.log('管理员表单数据收集完成，准备提交到服务器');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            // 模拟提交和服务器响应
            setTimeout(function() {
                alert('网站内容已成功更新！');
                // 模拟页面刷新，实际应用中应该根据服务器响应决定是否刷新
                //window.location.reload();
                
                // 关闭管理面板
                adminPanel.style.display = 'none';
            }, 1000);
        });
    }
});