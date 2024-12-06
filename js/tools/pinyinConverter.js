class PinyinConverter {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.chineseInput = document.getElementById('chineseInput');
        this.pinyinOutput = document.getElementById('pinyinOutput');
        this.pinyinStyle = document.getElementById('pinyinStyle');
        this.separator = document.getElementById('separator');
        this.caseType = document.getElementById('caseType');
        this.nameMode = document.getElementById('nameMode');
        this.copyButton = document.getElementById('copyResult');
    }

    bindEvents() {
        // 输入时实时转换
        this.chineseInput.addEventListener('input', () => this.convert());

        // 选项改变时重新转换
        this.pinyinStyle.addEventListener('change', () => this.convert());
        this.separator.addEventListener('change', () => this.convert());
        this.caseType.addEventListener('change', () => this.convert());
        this.nameMode.addEventListener('change', () => this.convert());

        // 复制结果
        this.copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(this.pinyinOutput.textContent)
                .then(() => {
                    this.copyButton.innerHTML = '<i class="bi bi-check"></i> 已复制';
                    setTimeout(() => {
                        this.copyButton.innerHTML = '<i class="bi bi-clipboard"></i> 复制';
                    }, 2000);
                });
        });
    }

    convert() {
        const text = this.chineseInput.value.trim();
        if (!text) {
            this.pinyinOutput.textContent = '';
            return;
        }

        try {
            // 使用新的转换函数
            const result = pinyin.convert(text, {
                toneType: this.pinyinStyle.value,
                separator: this.separator.value,
                caseType: this.caseType.value
            });

            this.pinyinOutput.textContent = result;
        } catch (error) {
            console.error('转换出错:', error);
            this.pinyinOutput.textContent = '转换出错，请检查输入';
        }
    }
} 