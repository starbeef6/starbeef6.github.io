document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded');

    // 隐藏加载动画
    setTimeout(function() {
        document.querySelector('.loader-wrapper').classList.add('hidden');
    }, 800);

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
        const words = ['AI应用开发者', '人工智能爱好者', '创意思考者'];
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
            document.querySelectorAll('.tab-pane').forEach(content => {
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
                    <option value="wechat">微信</option>
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
            
            // 更新页面内容
            const name = formData.get('name');
            const subtitle = formData.get('subtitle');
            const intro = formData.get('intro');
            const aboutText = formData.get('about-text');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const address = formData.get('address');
            
            // 更新基本信息
            document.querySelector('.hero-title').textContent = name;
            document.querySelector('.hero-subtitle .highlight').nextElementSibling.textContent = subtitle;
            
            // 更新关于我部分
            document.querySelector('.about-text h3 .highlight').textContent = name;
            const aboutParagraphs = document.querySelectorAll('.about-text p');
            if (aboutParagraphs.length >= 2) {
                aboutParagraphs[0].textContent = intro;
                aboutParagraphs[1].textContent = aboutText;
            }
            
            // 更新联系方式
            const contactDetails = document.querySelectorAll('.contact-text p');
            if (contactDetails.length >= 3) {
                contactDetails[0].textContent = email;
                contactDetails[1].textContent = phone;
                contactDetails[2].textContent = address;
            }
            
            // 更新技能（这里简化处理，实际应用中可能需要更复杂的逻辑）
            updateSkills('technical', formData);
            updateSkills('soft', formData);
            
            // 更新项目内容（简化处理）
            updateProjects(formData);
            
            // 更新社交媒体链接（简化处理）
            updateSocialLinks(formData);
            
            // 关闭管理面板
            adminPanel.style.display = 'none';
            
            // 显示成功消息
            alert('网站内容已成功更新！请注意，这些更改只会在当前会话中生效，刷新页面后将恢复。');
        });
    }
    
    // 辅助函数：更新技能
    function updateSkills(type, formData) {
        const skillEntries = document.querySelectorAll(`#${type}-skills-container .skill-entry`);
        const skillsContainer = document.querySelector(`#${type} .skills-grid`);
        
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            
            skillEntries.forEach(entry => {
                if (!entry.querySelector(`#add-${type}-skill`)) {
                    const nameInput = entry.querySelector('input[type="text"]');
                    const levelInput = entry.querySelector('input[type="range"]');
                    
                    if (nameInput && levelInput && nameInput.value.trim() !== '') {
                        const skillItem = document.createElement('div');
                        skillItem.className = 'skill-item';
                        skillItem.innerHTML = `
                            <div class="skill-info">
                                <h4>${nameInput.value}</h4>
                                <div class="skill-percentage">${levelInput.value}%</div>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: ${levelInput.value}%"></div>
                            </div>
                        `;
                        skillsContainer.appendChild(skillItem);
                    }
                }
            });
        }
    }
    
    // 辅助函数：更新项目
    function updateProjects(formData) {
        const projectEntries = document.querySelectorAll('#projects-container .project-entry');
        const projectsGrid = document.querySelector('.projects-grid');
        
        if (projectsGrid) {
            projectsGrid.innerHTML = '';
            
            projectEntries.forEach(entry => {
                const titleInput = entry.querySelector('input[name="project-title"]');
                const descInput = entry.querySelector('textarea[name="project-desc"]');
                const tagsInput = entry.querySelector('input[name="project-tags"]');
                const linkInput = entry.querySelector('input[name="project-link"]');
                const githubInput = entry.querySelector('input[name="project-github"]');
                
                if (titleInput && descInput && titleInput.value.trim() !== '') {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    
                    const tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                    const tagsHtml = tags.map(tag => `<span>${tag}</span>`).join('');
                    
                    projectCard.innerHTML = `
                        <div class="project-image">
                            <img src="https://via.placeholder.com/600x400" alt="${titleInput.value}">
                        </div>
                        <div class="project-info">
                            <h3>${titleInput.value}</h3>
                            <p>${descInput.value}</p>
                            <div class="project-tags">
                                ${tagsHtml}
                            </div>
                            <div class="project-links">
                                ${linkInput.value ? `<a href="${linkInput.value}" class="btn btn-sm" target="_blank">查看详情</a>` : ''}
                                ${githubInput.value ? `<a href="${githubInput.value}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                                ${linkInput.value ? `<a href="${linkInput.value}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                            </div>
                        </div>
                    `;
                    
                    projectsGrid.appendChild(projectCard);
                }
            });
        }
    }
    
    // 辅助函数：更新社交媒体链接
    function updateSocialLinks(formData) {
        const socialEntries = document.querySelectorAll('#social-container .social-entry');
        const socialContainer = document.querySelector('.social-links');
        
        if (socialContainer) {
            socialContainer.innerHTML = '';
            
            socialEntries.forEach(entry => {
                if (!entry.querySelector('#add-social')) {
                    const platformSelect = entry.querySelector('select[name="social-platform"]');
                    const linkInput = entry.querySelector('input[name="social-link"]');
                    
                    if (platformSelect && linkInput && linkInput.value.trim() !== '') {
                        let icon;
                        switch(platformSelect.value) {
                            case 'github':
                                icon = 'fab fa-github';
                                break;
                            case 'linkedin':
                                icon = 'fab fa-linkedin';
                                break;
                            case 'twitter':
                                icon = 'fab fa-twitter';
                                break;
                            case 'instagram':
                                icon = 'fab fa-instagram';
                                break;
                            case 'wechat':
                                icon = 'fab fa-weixin';
                                break;
                            default:
                                icon = 'fas fa-link';
                        }
                        
                        const a = document.createElement('a');
                        a.href = platformSelect.value === 'wechat' ? `javascript:alert('微信号: ${linkInput.value}')` : linkInput.value;
                        a.target = platformSelect.value !== 'wechat' ? '_blank' : '';
                        a.innerHTML = `<i class="${icon}"></i>`;
                        socialContainer.appendChild(a);
                    }
                }
            });
        }
    }
});