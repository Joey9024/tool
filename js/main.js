document.addEventListener('DOMContentLoaded', () => {
    // 初始化工具
    const imageResizer = new ImageResizer();
    const gifMaker = new GifMaker();
    const imageCompressor = new ImageCompressor();
    const pinyinConverter = new PinyinConverter();

    // 工具切换逻辑
    const toolLinks = document.querySelectorAll('.nav-link');
    const toolContents = document.querySelectorAll('.tool-content');

    // 默认显示第一个工具
    toolContents[0].style.display = 'block';
    toolLinks[0].classList.add('active');

    toolLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const toolId = link.getAttribute('data-tool');

            // 更新导航栏激活状态
            toolLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 显示对应的工具内容
            toolContents.forEach(content => {
                if (content.id === toolId) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
}); 