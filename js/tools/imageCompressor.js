class ImageCompressor {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.quality = 0.8;
        this.files = new Map();
        this.originalImage = null;
        this.compressedImage = null;
    }

    initElements() {
        // 通用元素
        this.dropZone = document.querySelector('#imageCompressor .upload-area');
        this.fileInput = document.querySelector('#imageCompressor .file-input');
        this.qualitySlider = document.querySelector('#imageCompressor .quality-control input');
        this.qualityValue = document.querySelector('#imageCompressor .quality-value');
        this.presetButtons = document.querySelectorAll('#imageCompressor .preset-buttons button');

        // 单图预览元素
        this.previewContainer = document.querySelector('#imageCompressor .preview-container');
        this.originalPreview = document.querySelector('#imageCompressor .original-preview');
        this.compressedPreview = document.querySelector('#imageCompressor .compressed-preview');
        this.originalSize = document.querySelector('#imageCompressor .original-size');
        this.compressedSize = document.querySelector('#imageCompressor .compressed-size');
        this.downloadBtn = document.querySelector('#imageCompressor #compressBtn');

        // 多图列表元素
        this.fileList = document.querySelector('#imageCompressor .compression-list');
        this.fileListCard = document.querySelector('#imageCompressor .file-list');
        this.compressAllBtn = document.querySelector('#compressAllBtn');
        this.downloadAllBtn = document.querySelector('#downloadAllBtn');
        this.clearListBtn = document.querySelector('#clearListBtn');
    }

    bindEvents() {
        // 文件上传相关事件
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
            const files = e.dataTransfer.files;
            if (files.length) this.handleFiles(files);
        });
        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) this.handleFiles(e.target.files);
        });

        // 压缩质量控制
        this.qualitySlider.addEventListener('input', (e) => {
            this.quality = e.target.value / 100;
            this.qualityValue.textContent = `${e.target.value}%`;
            
            // 更新所有预览
            if (this.originalImage) {
                // 单图模式
                this.compressImage();
            }
            
            // 多图模式：更新所有文件的预览
            this.files.forEach((fileInfo, fileId) => {
                const fileItem = this.fileList.querySelector(`[data-file-id="${fileId}"]`);
                if (fileItem) {
                    this.previewCompression(fileId, fileItem);
                }
            });
        });

        // 预设按钮
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const quality = {
                    'high': 0.8,
                    'medium': 0.6,
                    'low': 0.3
                }[btn.dataset.quality];
                
                this.quality = quality;
                this.qualitySlider.value = quality * 100;
                this.qualityValue.textContent = `${quality * 100}%`;
                
                // 更新所有预览
                if (this.originalImage) {
                    this.compressImage();
                }
                
                this.files.forEach((fileInfo, fileId) => {
                    const fileItem = this.fileList.querySelector(`[data-file-id="${fileId}"]`);
                    if (fileItem) {
                        this.previewCompression(fileId, fileItem);
                    }
                });
            });
        });

        // 单图下载按钮
        this.downloadBtn?.addEventListener('click', () => {
            if (this.compressedImage) {
                const link = document.createElement('a');
                link.download = 'compressed_image.jpg';
                link.href = this.compressedImage;
                link.click();
            }
        });

        // 批量操作按钮
        this.compressAllBtn?.addEventListener('click', () => this.compressAll());
        this.downloadAllBtn?.addEventListener('click', () => this.downloadAll());
        this.clearListBtn?.addEventListener('click', () => this.clearList());
    }

    handleFiles(files) {
        if (files.length === 1) {
            // 单图模式
            this.handleSingleFile(files[0]);
        } else {
            // 多图模式
            this.handleMultipleFiles(files);
        }
    }

    handleSingleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.originalImage = e.target.result;
            this.originalPreview.src = this.originalImage;
            this.originalSize.textContent = this.formatFileSize(file.size);
            this.compressImage();
            
            // 显示预览模式
            this.previewContainer.style.display = 'block';
            this.fileListCard.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    handleMultipleFiles(files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件！');
                return;
            }
            
            const fileId = Date.now() + Math.random().toString(36).substr(2, 9);
            this.files.set(fileId, {
                file,
                status: 'pending',
                originalSize: file.size,
                compressedSize: 0,
                compressedBlob: null
            });
            
            this.addFileToList(fileId);
        });
        
        // 显示列表模式
        this.previewContainer.style.display = 'none';
        this.fileListCard.style.display = 'block';
        this.downloadAllBtn.style.display = 'none';
    }

    async compressImage() {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            this.compressedImage = canvas.toDataURL('image/jpeg', this.quality);
            this.compressedPreview.src = this.compressedImage;
            
            // 计算压缩后的大小和压缩比例
            const originalSize = Math.round((this.originalImage.length - 'data:image/jpeg;base64,'.length) * 3/4);
            const compressedSize = Math.round((this.compressedImage.length - 'data:image/jpeg;base64,'.length) * 3/4);
            const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
            
            // 更新显示
            this.originalSize.textContent = this.formatFileSize(originalSize);
            this.compressedSize.textContent = `${this.formatFileSize(compressedSize)} (减小${compressionRatio}%)`;
        };
        img.src = this.originalImage;
    }

    addFileToList(fileId) {
        const fileInfo = this.files.get(fileId);
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.fileId = fileId;
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-name">${fileInfo.file.name}</div>
                <div class="file-size">
                    原始大小：${this.formatFileSize(fileInfo.originalSize)}
                    <span class="compressed-size"></span>
                </div>
            </div>
            <div class="compression-preview">
                <div class="preview-images">
                    <div class="preview-original">
                        <img src="" alt="原图预览">
                    </div>
                    <div class="preview-compressed">
                        <img src="" alt="压缩预览">
                    </div>
                </div>
                <div class="compression-progress">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                    </div>
                    <span class="progress-text">待处理</span>
                </div>
            </div>
            <div class="file-actions">
                <button class="btn btn-outline-danger btn-sm remove-file">
                    <i class="bi bi-x"></i>
                </button>
                <button class="btn btn-primary btn-sm download-file" style="display: none;">
                    <i class="bi bi-download"></i>
                </button>
            </div>
        `;

        // 加载原图预览
        const reader = new FileReader();
        reader.onload = (e) => {
            const originalImg = fileItem.querySelector('.preview-original img');
            originalImg.src = e.target.result;
            // 保存原图数据用于压缩
            fileInfo.originalDataUrl = e.target.result;
            // 立即进行压缩预览
            this.previewCompression(fileId, fileItem);
        };
        reader.readAsDataURL(fileInfo.file);
        
        // 绑定事件
        fileItem.querySelector('.remove-file').addEventListener('click', () => {
            this.files.delete(fileId);
            fileItem.remove();
            if (this.files.size === 0) {
                this.fileListCard.style.display = 'none';
            }
        });
        
        fileItem.querySelector('.download-file').addEventListener('click', () => {
            this.downloadFile(fileId);
        });
        
        this.fileList.appendChild(fileItem);
    }

    async previewCompression(fileId, fileItem) {
        const fileInfo = this.files.get(fileId);
        const img = new Image();
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // 使用当前设置的压缩质量
            const compressedDataUrl = canvas.toDataURL('image/jpeg', this.quality);
            
            // 更新压缩预览图
            const compressedImg = fileItem.querySelector('.preview-compressed img');
            compressedImg.src = compressedDataUrl;
            
            // 计算并显示压缩后的大小
            const compressedSize = Math.round((compressedDataUrl.length - 'data:image/jpeg;base64,'.length) * 3/4);
            const compressionRatio = ((1 - compressedSize / fileInfo.originalSize) * 100).toFixed(1);
            fileItem.querySelector('.compressed-size').textContent = 
                ` → ${this.formatFileSize(compressedSize)} (减小${compressionRatio}%)`;
        };
        
        img.src = fileInfo.originalDataUrl;
    }

    async compressAll() {
        this.compressAllBtn.disabled = true;
        this.clearListBtn.disabled = true;
        
        const compressionTasks = [];
        this.files.forEach((fileInfo, fileId) => {
            if (fileInfo.status === 'pending') {
                compressionTasks.push(this.compressFile(fileId));
            }
        });
        
        await Promise.all(compressionTasks);
        
        this.compressAllBtn.disabled = false;
        this.clearListBtn.disabled = false;
        this.downloadAllBtn.style.display = 'inline-block';
    }

    async compressFile(fileId) {
        const fileInfo = this.files.get(fileId);
        const fileItem = this.fileList.querySelector(`[data-file-id="${fileId}"]`);
        const progressBar = fileItem.querySelector('.progress-bar');
        const progressText = fileItem.querySelector('.progress-text');
        const downloadBtn = fileItem.querySelector('.download-file');
        
        progressBar.style.width = '50%';
        progressText.textContent = '压缩中...';
        
        try {
            const compressed = await this.compress(fileInfo.file);
            fileInfo.compressedBlob = compressed;
            fileInfo.compressedSize = compressed.size;
            fileInfo.status = 'completed';
            
            progressBar.style.width = '100%';
            progressBar.classList.add('bg-success');
            progressText.textContent = '完成';
            downloadBtn.style.display = 'inline-block';
            
            const compressedSizeText = this.formatFileSize(compressed.size);
            const compressionRatio = ((1 - compressed.size / fileInfo.originalSize) * 100).toFixed(1);
            fileItem.querySelector('.compressed-size').textContent = 
                ` → ${compressedSizeText} (减小${compressionRatio}%)`;
        } catch (error) {
            progressBar.classList.add('bg-danger');
            progressText.textContent = '失败';
            console.error('Compression failed:', error);
        }
    }

    async compress(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                canvas.toBlob(
                    blob => resolve(blob),
                    'image/jpeg',
                    this.quality
                );
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    downloadFile(fileId) {
        const fileInfo = this.files.get(fileId);
        const link = document.createElement('a');
        link.download = `compressed_${fileInfo.file.name}`;
        link.href = URL.createObjectURL(fileInfo.compressedBlob);
        link.click();
    }

    async downloadAll() {
        const zip = new JSZip();
        
        this.files.forEach((fileInfo, fileId) => {
            if (fileInfo.status === 'completed') {
                zip.file(`compressed_${fileInfo.file.name}`, fileInfo.compressedBlob);
            }
        });
        
        const blob = await zip.generateAsync({type: 'blob'});
        const link = document.createElement('a');
        link.download = 'compressed_images.zip';
        link.href = URL.createObjectURL(blob);
        link.click();
    }

    clearList() {
        this.files.clear();
        this.fileList.innerHTML = '';
        this.fileListCard.style.display = 'none';
        this.downloadAllBtn.style.display = 'none';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
} 