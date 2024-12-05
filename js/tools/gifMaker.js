class GifMaker {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.selectedImages = [];
    }

    initElements() {
        this.dropZone = document.getElementById('gifDropZone');
        this.fileInput = document.getElementById('gifFileInput');
        this.imageList = document.getElementById('imageList');
        this.previewArea = document.querySelector('.gif-preview');
        this.frameDelay = document.getElementById('frameDelay');
        this.loopCount = document.getElementById('loopCount');
        this.generateBtn = document.getElementById('generateGifBtn');
    }

    bindEvents() {
        this.dropZone.addEventListener('click', () => this.fileInput.click());
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('dragover');
        });
        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('dragover');
        });
        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            this.handleFiles(files);
        });

        this.fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files);
        });

        this.generateBtn.addEventListener('click', () => this.generateGif());
    }

    handleFiles(files) {
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedImages.push(e.target.result);
                this.updateImageList();
            };
            reader.readAsDataURL(file);
        });
    }

    updateImageList() {
        this.imageList.innerHTML = '';
        this.selectedImages.forEach((image, index) => {
            const div = document.createElement('div');
            div.className = 'image-item';
            div.innerHTML = `
                <img src="${image}" alt="选择的图片 ${index + 1}">
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            div.querySelector('.remove-btn').addEventListener('click', () => {
                this.selectedImages.splice(index, 1);
                this.updateImageList();
            });
            this.imageList.appendChild(div);
        });

        if (this.selectedImages.length > 0) {
            this.previewArea.style.display = 'block';
        } else {
            this.previewArea.style.display = 'none';
        }
    }

    async generateGif() {
        if (this.selectedImages.length < 2) {
            alert('请至少选择2张图片');
            return;
        }

        this.generateBtn.disabled = true;
        this.generateBtn.textContent = '生成中...';

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 300;

            // 创建GIF编码器
            const gif = new GIF({
                workers: 2,
                quality: 10,
                width: canvas.width,
                height: canvas.height,
                workerScript: 'js/lib/gif.worker.js'
            });

            // 添加进度显示
            gif.on('progress', (p) => {
                this.generateBtn.textContent = `生成中... ${Math.round(p * 100)}%`;
            });

            // 加载所有图片
            const images = await Promise.all(this.selectedImages.map(src => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.src = src;
                });
            }));

            // 处理每一帧
            for (const img of images) {
                // 清空canvas
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 计算缩放和位置
                const scale = Math.min(
                    canvas.width / img.width,
                    canvas.height / img.height
                );
                const x = (canvas.width - img.width * scale) / 2;
                const y = (canvas.height - img.height * scale) / 2;

                // 绘制图片
                ctx.drawImage(
                    img,
                    x, y,
                    img.width * scale,
                    img.height * scale
                );

                // 添加帧
                gif.addFrame(ctx, {
                    delay: parseInt(this.frameDelay.value),
                    copy: true
                });
            }

            // 生成GIF
            gif.on('finished', (blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'animation.gif';
                link.click();

                // 清理
                URL.revokeObjectURL(url);
                this.generateBtn.disabled = false;
                this.generateBtn.textContent = '生成GIF';
            });

            gif.render();

        } catch (error) {
            console.error('生成GIF时出错:', error);
            alert('生成GIF时出错，请重试');
            this.generateBtn.disabled = false;
            this.generateBtn.textContent = '生成GIF';
        }
    }
} 