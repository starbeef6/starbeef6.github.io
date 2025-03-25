document.addEventListener('DOMContentLoaded', function() {
    // API URL - 本地开发用localhost，生产环境用实际域名
    const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000/api' 
        : 'https://api.yanmingxing.xyz/api'; // 生产环境API地址，需要替换为实际地址

    console.log('Website loaded');

    // 添加复试资料功能
    const examResourcesLink = document.getElementById('exam-resources-link');
    const examPasswordModal = document.getElementById('exam-password-modal');
    const examResources = document.getElementById('exam-resources');
    const examPasswordForm = document.getElementById('exam-password-form');
    const closeExamModal = document.querySelector('.close-modal');
    
    // 正确的密码
    const correctPassword = 'uestc2024';
    
    // 标记是否已加载复试资料内容
    let examContentLoaded = false;
    
    // 点击星星图标显示密码框
    if (examResourcesLink) {
        examResourcesLink.addEventListener('click', function(e) {
            e.preventDefault();
            examPasswordModal.style.display = 'block';
        });
    }
    
    // 关闭密码框
    if (closeExamModal) {
        closeExamModal.addEventListener('click', function() {
            examPasswordModal.style.display = 'none';
        });
    }
    
    // 验证密码
    if (examPasswordForm) {
        examPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('exam-password').value;
            
            if (password === correctPassword) {
                // 密码正确，加载复试资料内容（如果还没加载）
                if (!examContentLoaded) {
                    loadExamContent();
                    examContentLoaded = true;
                }
                
                // 显示复试资料
                examPasswordModal.style.display = 'none';
                examResources.style.display = 'block';
                document.getElementById('exam-password').value = ''; // 清空密码框
            } else {
                // 密码错误，显示提示
                alert('密码错误，请重试');
            }
        });
    }
    
    // 动态加载复试资料内容
    function loadExamContent() {
        // 创建内容HTML
        const examHtml = `
            <div class="container">
                <div class="exam-header">
                    <h2>电子科技大学MBA复试资料汇总</h2>
                    <span class="close-exam">&times;</span>
                </div>
                <div class="exam-content">
                    <div class="exam-tabs">
                        <div class="exam-tab active" data-tab="overview">复试概述</div>
                        <div class="exam-tab" data-tab="templates">面试模板</div>
                        <div class="exam-tab" data-tab="politics">政治考点</div>
                        <div class="exam-tab" data-tab="questions">历年真题</div>
                    </div>
                    <div class="exam-tab-content">
                        <!-- 复试概述 -->
                        <div class="exam-panel active" id="overview-panel">
                            <h3>复试概述</h3>
                            <p>电子科技大学MBA复试主要包括三个部分：政治理论笔试、英语口语与听力测试，以及综合测试（包括小组面试）。总分300分，占录取总成绩的50%。</p>
                            <p>计算公式：总成绩 = (初试成绩/3)×50% + (复试成绩/3)×50%</p>
                            <p>复试合格线：非国家专项计划考生总分及单项成绩均达到60%，国家专项计划考生总分达到60%即可。</p>
                        </div>
                        
                        <!-- 面试模板 -->
                        <div class="exam-panel" id="templates-panel">
                            <h3>面试万能模板</h3>
                            <div class="collapsible-item">
                                <div class="collapsible-header">综合面试万能模板（中文，以AI为核心）<span class="toggle-icon">▼</span></div>
                                <div class="collapsible-content">
                                    <p>综合面试通常考察您的管理思维、行业洞察和逻辑表达能力。该模板结合AI视角，确保回答有深度且与问题相关。</p>
                                    <h4>模板结构</h4>
                                    <ul>
                                        <li><strong>AI视角切入</strong>：用AI相关概念直接回应问题，展现您的专业性</li>
                                        <li><strong>具体例子或逻辑支持</strong>：结合AI应用案例或您的理解，支撑观点</li>
                                        <li><strong>联系问题并总结</strong>：将AI与问题核心联系起来，给出结论</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 政治考点 -->
                        <div class="exam-panel" id="politics-panel">
                            <h3>政治考点</h3>
                            <div class="collapsible-item">
                                <div class="collapsible-header">经济学类名词<span class="toggle-icon">▼</span></div>
                                <div class="collapsible-content">
                                    <div class="term-item">
                                        <div class="term-name">供给侧结构性改革</div>
                                        <div class="term-definition">从提高供给质量出发，通过调整经济结构、转变增长方式、化解过剩产能，实现更高质量、更有效率、更可持续的发展。</div>
                                    </div>
                                    <div class="term-item">
                                        <div class="term-name">新发展格局</div>
                                        <div class="term-definition">以国内大循环为主体、国内国际双循环相互促进的经济发展模式，强调扩大内需和自主创新。</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 历年真题 -->
                        <div class="exam-panel" id="questions-panel">
                            <h3>历年真题</h3>
                            <p>此部分包含历年MBA复试真题汇总和分析。</p>
                            <p>资料持续更新中...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加内容到DOM
        examResources.innerHTML = examHtml;
        
        // 添加事件监听器
        const closeExam = document.querySelector('.close-exam');
        if (closeExam) {
            closeExam.addEventListener('click', function() {
                examResources.style.display = 'none';
            });
        }
        
        // 切换复试资料标签页
        const examTabs = document.querySelectorAll('.exam-tab');
        if (examTabs.length > 0) {
            examTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // 移除所有tab的active类
                    examTabs.forEach(t => t.classList.remove('active'));
                    // 添加active类到当前点击的tab
                    this.classList.add('active');
                    
                    // 隐藏所有面板
                    document.querySelectorAll('.exam-panel').forEach(panel => {
                        panel.classList.remove('active');
                    });
                    
                    // 显示对应面板
                    const tabId = this.getAttribute('data-tab');
                    document.getElementById(tabId + '-panel').classList.add('active');
                });
            });
        }
        
        // 可折叠内容功能
        const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
        if (collapsibleHeaders.length > 0) {
            collapsibleHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    const toggleIcon = this.querySelector('.toggle-icon');
                    
                    if (content.style.display === 'block') {
                        content.style.display = 'none';
                        if (toggleIcon) toggleIcon.textContent = '▼';
                    } else {
                        content.style.display = 'block';
                        if (toggleIcon) toggleIcon.textContent = '▲';
                    }
                });
            });
        }
    }
    
    // 点击页面其他地方关闭模态框
    window.addEventListener('click', function(e) {
        if (e.target === examPasswordModal) {
            examPasswordModal.style.display = 'none';
        }
    });

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

    // 从服务器获取网站数据
    async function fetchWebsiteData() {
        try {
            const response = await fetch(`${API_URL}/website-data`);
            if (!response.ok) {
                throw new Error('获取数据失败');
            }
            return await response.json();
        } catch (error) {
            console.error('获取网站数据出错:', error);
            return null;
        }
    }

    // 更新网站数据到服务器
    async function updateWebsiteData(data) {
        try {
            const response = await fetch(`${API_URL}/website-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error('保存数据失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('更新网站数据出错:', error);
            throw error;
        }
    }

    // 填充网站内容
    async function populateWebsiteContent() {
        const data = await fetchWebsiteData();
        if (!data) {
            console.warn('无法获取网站数据，使用默认内容');
            return;
        }

        // 更新基本信息
        document.querySelector('.hero-title').textContent = data.name;
        document.querySelector('.about-text h3 .highlight').textContent = data.name;

        // 更新关于我
        const introElements = document.querySelectorAll('.about-text p');
        if (introElements.length >= 2) {
            introElements[0].textContent = data.intro;
            introElements[1].textContent = data.aboutText;
        }

        // 更新技能
        updateSkills('technical', data.technicalSkills);
        updateSkills('soft', data.softSkills);

        // 更新项目
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid && data.projects) {
            projectsGrid.innerHTML = '';
            data.projects.forEach(project => {
                projectsGrid.appendChild(createProjectCard(project));
            });
        }

        // 更新联系信息
        if (data.contact) {
            const contactElements = document.querySelectorAll('.contact-details p');
            if (contactElements.length >= 3) {
                contactElements[0].textContent = data.contact.email;
                contactElements[1].textContent = data.contact.phone;
                contactElements[2].textContent = data.contact.address;
            }

            // 更新社交媒体链接
            updateSocialLinks(data.contact.social);
        }

        // 更新管理面板数据
        populateAdminPanel(data);
    }

    // 更新技能部分
    function updateSkills(skillType, skills) {
        const skillsContainer = document.querySelector(`#${skillType} .skills-grid`);
        if (!skillsContainer || !skills) return;

        skillsContainer.innerHTML = '';
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-info">
                    <h4>${skill.name}</h4>
                    <div class="skill-percentage">${skill.level}%</div>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                </div>
            `;
            skillsContainer.appendChild(skillItem);
        });
    }

    // 创建项目卡片
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // 准备标签HTML
        const tagsHtml = project.tags ? project.tags.map(tag => `<span>${tag}</span>`).join('') : '';
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image || 'https://via.placeholder.com/600x400'}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHtml}
                </div>
                <div class="project-links">
                    ${project.link ? `<a href="${project.link}" class="btn btn-sm" target="_blank">查看详情</a>` : ''}
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                    ${project.link ? `<a href="${project.link}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                </div>
            </div>
        `;
        
        return card;
    }

    // 更新社交媒体链接
    function updateSocialLinks(socialLinks) {
        const socialContainer = document.querySelector('.social-links');
        if (!socialContainer || !socialLinks) return;

        socialContainer.innerHTML = '';
        socialLinks.forEach(link => {
            let icon;
            switch(link.platform) {
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
            a.href = link.platform === 'wechat' ? `javascript:alert('微信号: ${link.link}')` : link.link;
            a.target = link.platform !== 'wechat' ? '_blank' : '';
            a.innerHTML = `<i class="${icon}"></i>`;
            socialContainer.appendChild(a);
        });
    }

    // 填充管理面板数据
    function populateAdminPanel(data) {
        document.getElementById('admin-name').value = data.name || '';
        document.getElementById('admin-subtitle').value = data.subtitle || '';
        document.getElementById('admin-intro').value = data.intro || '';
        document.getElementById('admin-about').value = data.aboutText || '';
        document.getElementById('admin-email').value = data.contact?.email || '';
        document.getElementById('admin-phone').value = data.contact?.phone || '';
        document.getElementById('admin-address').value = data.contact?.address || '';

        // 技术技能
        const techSkillsContainer = document.getElementById('technical-skills-container');
        if (techSkillsContainer) {
            const skillEntries = techSkillsContainer.querySelectorAll('.skill-entry');
            skillEntries.forEach(entry => {
                if (!entry.querySelector('#add-tech-skill')) {
                    entry.remove();
                }
            });

            const addButton = document.getElementById('add-tech-skill');
            if (data.technicalSkills && addButton) {
                data.technicalSkills.forEach(skill => {
                    const skillEntry = document.createElement('div');
                    skillEntry.className = 'skill-entry';
                    
                    const uniqueId = Date.now() + Math.random().toString(36).substring(2, 9);
                    skillEntry.innerHTML = `
                        <input type="text" name="tech-skill-name-${uniqueId}" placeholder="技能名称" value="${skill.name}">
                        <input type="range" name="tech-skill-level-${uniqueId}" min="0" max="100" value="${skill.level}">
                        <span class="skill-value">${skill.level}%</span>
                        <button type="button" class="remove-skill">移除</button>
                    `;
                    
                    techSkillsContainer.insertBefore(skillEntry, addButton);
                    
                    // 添加事件监听器
                    const rangeInput = skillEntry.querySelector('input[type="range"]');
                    const valueDisplay = skillEntry.querySelector('.skill-value');
                    
                    rangeInput.addEventListener('input', function() {
                        valueDisplay.textContent = this.value + '%';
                    });
                    
                    const removeButton = skillEntry.querySelector('.remove-skill');
                    removeButton.addEventListener('click', function() {
                        techSkillsContainer.removeChild(skillEntry);
                    });
                });
            }
        }

        // 软技能
        const softSkillsContainer = document.getElementById('soft-skills-container');
        if (softSkillsContainer) {
            const skillEntries = softSkillsContainer.querySelectorAll('.skill-entry');
            skillEntries.forEach(entry => {
                if (!entry.querySelector('#add-soft-skill')) {
                    entry.remove();
                }
            });

            const addButton = document.getElementById('add-soft-skill');
            if (data.softSkills && addButton) {
                data.softSkills.forEach(skill => {
                    const skillEntry = document.createElement('div');
                    skillEntry.className = 'skill-entry';
                    
                    const uniqueId = Date.now() + Math.random().toString(36).substring(2, 9);
                    skillEntry.innerHTML = `
                        <input type="text" name="soft-skill-name-${uniqueId}" placeholder="技能名称" value="${skill.name}">
                        <input type="range" name="soft-skill-level-${uniqueId}" min="0" max="100" value="${skill.level}">
                        <span class="skill-value">${skill.level}%</span>
                        <button type="button" class="remove-skill">移除</button>
                    `;
                    
                    softSkillsContainer.insertBefore(skillEntry, addButton);
                    
                    // 添加事件监听器
                    const rangeInput = skillEntry.querySelector('input[type="range"]');
                    const valueDisplay = skillEntry.querySelector('.skill-value');
                    
                    rangeInput.addEventListener('input', function() {
                        valueDisplay.textContent = this.value + '%';
                    });
                    
                    const removeButton = skillEntry.querySelector('.remove-skill');
                    removeButton.addEventListener('click', function() {
                        softSkillsContainer.removeChild(skillEntry);
                    });
                });
            }
        }

        // 项目
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = '';
            
            if (data.projects) {
                data.projects.forEach(project => {
                    const projectEntry = document.createElement('div');
                    projectEntry.className = 'project-entry';
                    
                    projectEntry.innerHTML = `
                        <div class="form-group">
                            <label>项目标题</label>
                            <input type="text" name="project-title" value="${project.title || ''}">
                        </div>
                        <div class="form-group">
                            <label>项目描述</label>
                            <textarea name="project-desc">${project.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>项目图片</label>
                            <input type="file" name="project-image">
                            ${project.image ? `<img src="${project.image}" alt="${project.title}" style="max-width: 100px; margin-top: 10px;">` : ''}
                        </div>
                        <div class="form-group">
                            <label>技术标签 (逗号分隔)</label>
                            <input type="text" name="project-tags" value="${project.tags ? project.tags.join(', ') : ''}">
                        </div>
                        <div class="form-group">
                            <label>项目链接</label>
                            <input type="text" name="project-link" placeholder="项目URL" value="${project.link || ''}">
                        </div>
                        <div class="form-group">
                            <label>Github链接</label>
                            <input type="text" name="project-github" placeholder="Github URL" value="${project.github || ''}">
                        </div>
                        <button type="button" class="remove-project btn btn-outline btn-sm">移除项目</button>
                    `;
                    
                    projectsContainer.appendChild(projectEntry);
                    
                    const removeButton = projectEntry.querySelector('.remove-project');
                    removeButton.addEventListener('click', function() {
                        projectsContainer.removeChild(projectEntry);
                    });
                });
            }
        }

        // 社交媒体
        const socialContainer = document.getElementById('social-container');
        if (socialContainer && data.contact?.social) {
            const socialEntries = socialContainer.querySelectorAll('.social-entry');
            socialEntries.forEach(entry => {
                if (!entry.querySelector('#add-social')) {
                    entry.remove();
                }
            });

            const addButton = document.getElementById('add-social');
            if (addButton) {
                data.contact.social.forEach(social => {
                    const socialEntry = document.createElement('div');
                    socialEntry.className = 'social-entry';
                    
                    socialEntry.innerHTML = `
                        <select name="social-platform">
                            <option value="github" ${social.platform === 'github' ? 'selected' : ''}>GitHub</option>
                            <option value="linkedin" ${social.platform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                            <option value="twitter" ${social.platform === 'twitter' ? 'selected' : ''}>Twitter</option>
                            <option value="instagram" ${social.platform === 'instagram' ? 'selected' : ''}>Instagram</option>
                            <option value="wechat" ${social.platform === 'wechat' ? 'selected' : ''}>微信</option>
                        </select>
                        <input type="text" name="social-link" placeholder="链接URL" value="${social.link || ''}">
                        <button type="button" class="remove-social">移除</button>
                    `;
                    
                    socialContainer.insertBefore(socialEntry, addButton);
                    
                    const removeButton = socialEntry.querySelector('.remove-social');
                    removeButton.addEventListener('click', function() {
                        socialContainer.removeChild(socialEntry);
                    });
                });
            }
        }
    }

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
        adminForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // 收集表单数据
            const formData = new FormData(adminForm);
            
            // 准备保存到服务器的数据对象
            const websiteData = {
                name: formData.get('name'),
                subtitle: formData.get('subtitle'),
                intro: formData.get('intro'),
                aboutText: formData.get('about-text'),
                technicalSkills: [],
                softSkills: [],
                projects: [],
                contact: {
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    address: formData.get('address'),
                    social: []
                }
            };
            
            // 收集技术技能数据
            document.querySelectorAll('#technical-skills-container .skill-entry').forEach(entry => {
                const nameInput = entry.querySelector('input[type="text"]');
                const levelInput = entry.querySelector('input[type="range"]');
                
                if (nameInput && levelInput && nameInput.value.trim() !== '') {
                    websiteData.technicalSkills.push({
                        name: nameInput.value,
                        level: parseInt(levelInput.value)
                    });
                }
            });
            
            // 收集软技能数据
            document.querySelectorAll('#soft-skills-container .skill-entry').forEach(entry => {
                const nameInput = entry.querySelector('input[type="text"]');
                const levelInput = entry.querySelector('input[type="range"]');
                
                if (nameInput && levelInput && nameInput.value.trim() !== '') {
                    websiteData.softSkills.push({
                        name: nameInput.value,
                        level: parseInt(levelInput.value)
                    });
                }
            });
            
            // 收集项目数据
            document.querySelectorAll('#projects-container .project-entry').forEach(entry => {
                const titleInput = entry.querySelector('input[name="project-title"]');
                const descInput = entry.querySelector('textarea[name="project-desc"]');
                const tagsInput = entry.querySelector('input[name="project-tags"]');
                const linkInput = entry.querySelector('input[name="project-link"]');
                const githubInput = entry.querySelector('input[name="project-github"]');
                
                if (titleInput && descInput && titleInput.value.trim() !== '') {
                    websiteData.projects.push({
                        title: titleInput.value,
                        description: descInput.value,
                        tags: tagsInput ? tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
                        link: linkInput ? linkInput.value : '',
                        github: githubInput ? githubInput.value : ''
                    });
                }
            });
            
            // 收集社交媒体数据
            document.querySelectorAll('#social-container .social-entry').forEach(entry => {
                const platformSelect = entry.querySelector('select[name="social-platform"]');
                const linkInput = entry.querySelector('input[name="social-link"]');
                
                if (platformSelect && linkInput && linkInput.value.trim() !== '') {
                    websiteData.contact.social.push({
                        platform: platformSelect.value,
                        link: linkInput.value
                    });
                }
            });
            
            try {
                // 保存数据到服务器
                await updateWebsiteData(websiteData);
                
                // 更新页面内容
                populateWebsiteContent();
                
                // 关闭管理面板
                adminPanel.style.display = 'none';
                
                alert('网站内容已成功更新！');
            } catch (error) {
                alert(`保存失败: ${error.message}`);
            }
        });
    }

    // 初始加载网站数据
    populateWebsiteContent();
});