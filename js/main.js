document.addEventListener('DOMContentLoaded', () => {
    // 初始化图片处理工具
    const imageResizer = new ImageResizer();
    const gifMaker = new GifMaker();

    // 工具切换逻辑
    const toolLinks = document.querySelectorAll('.nav-link');
    const toolContents = document.querySelectorAll('.tool-content');

    toolLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const toolId = link.getAttribute('data-tool');

            // 更新导航栏激活状态
            toolLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 显示对应的工具内容
            toolContents.forEach(content => {
                content.style.display = content.id === toolId ? 'block' : 'none';
            });
        });
    });
}); 