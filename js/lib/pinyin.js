const pinyin = {
    // 声母表
    initials: 'b p m f d t n l g k h j q x zh ch sh r z c s'.split(' '),
    
    // 韵母表
    finals: 'a o e i u v ai ei ui ao ou iu ie ve er an en in un vn ang eng ing ong'.split(' '),
    
    // 声调表
    tones: {
        'ā': 'a1', 'á': 'a2', 'ǎ': 'a3', 'à': 'a4',
        'ō': 'o1', 'ó': 'o2', 'ǒ': 'o3', 'ò': 'o4',
        'ē': 'e1', 'é': 'e2', 'ě': 'e3', 'è': 'e4',
        'ī': 'i1', 'í': 'i2', 'ǐ': 'i3', 'ì': 'i4',
        'ū': 'u1', 'ú': 'u2', 'ǔ': 'u3', 'ù': 'u4',
        'ǖ': 'v1', 'ǘ': 'v2', 'ǚ': 'v3', 'ǜ': 'v4',
        'ń': 'n2', 'ň': 'n3', 'ǹ': 'n4',
        'ḿ': 'm2'
    },

    // 基础字典（常用字）
    dict: {
        '爱': ['ài'],
        '上': ['shàng'],
        '对': ['duì'],
        '方': ['fāng'],
        '你': ['nǐ'],
        '好': ['hǎo'],
        // ... 可以继续添加更多汉字
        '我': ['wǒ'],
        '他': ['tā'],
        '她': ['tā'],
        '它': ['tā'],
        '们': ['men'],
        
        // 常用动词
        '是': ['shì'],
        '有': ['yǒu'],
        '在': ['zài'],
        '想': ['xiǎng'],
        '要': ['yào'],
        '会': ['huì'],
        '能': ['néng'],
        '做': ['zuò'],
        '说': ['shuō'],
        '看': ['kàn'],
        '去': ['qù'],
        '来': ['lái'],
        '吃': ['chī'],
        '喝': ['hē'],
        '玩': ['wán'],
        '睡': ['shuì'],
        
        // 常用形容词
        '好': ['hǎo'],
        '大': ['dà'],
        '小': ['xiǎo'],
        '多': ['duō'],
        '少': ['shǎo'],
        '高': ['gāo'],
        '低': ['dī'],
        '快': ['kuài'],
        '慢': ['màn'],
        '新': ['xīn'],
        '旧': ['jiù'],
        
        // 常用名词
        '人': ['rén'],
        '家': ['jiā'],
        '事': ['shì'],
        '时': ['shí'],
        '天': ['tiān'],
        '地': ['dì'],
        '年': ['nián'],
        '月': ['yuè'],
        '日': ['rì'],
        '水': ['shuǐ'],
        '火': ['huǒ'],
        '山': ['shān'],
        '路': ['lù'],
        
        // 常用副词
        '很': ['hěn'],
        '非': ['fēi'],
        '太': ['tài'],
        '都': ['dōu'],
        '还': ['hái'],
        '再': ['zài'],
        '就': ['jiù'],
        '又': ['yòu'],
        
        // 常用连词和介词
        '和': ['hé'],
        '跟': ['gēn'],
        '但': ['dàn'],
        '而': ['ér'],
        '所': ['suǒ'],
        '以': ['yǐ'],
        '把': ['bǎ'],
        '被': ['bèi'],
        '从': ['cóng'],
        '向': ['xiàng'],
        
        // 疑问词
        '谁': ['shuí'],
        '什': ['shén'],
        '么': ['me'],
        '怎': ['zěn'],
        '哪': ['nǎ'],
        '为': ['wèi'],
        '么': ['me'],
        
        // 数字
        '一': ['yī'],
        '二': ['èr'],
        '三': ['sān'],
        '四': ['sì'],
        '五': ['wǔ'],
        '六': ['liù'],
        '七': ['qī'],
        '八': ['bā'],
        '九': ['jiǔ'],
        '十': ['shí'],
        '百': ['bǎi'],
        '千': ['qiān'],
        '万': ['wàn'],
        
        // 量词
        '个': ['gè'],
        '只': ['zhī'],
        '条': ['tiáo'],
        '张': ['zhāng'],
        '件': ['jiàn'],
        '本': ['běn'],
        '块': ['kuài'],
        
        // 时间词
        '今': ['jīn'],
        '明': ['míng'],
        '昨': ['zuó'],
        '早': ['zǎo'],
        '晚': ['wǎn'],
        '上': ['shàng'],
        '下': ['xià'],
        '前': ['qián'],
        '后': ['hòu'],
        '中': ['zhōng'],
        
        // 方位词
        '东': ['dōng'],
        '南': ['nán'],
        '西': ['xī'],
        '北': ['běi'],
        '左': ['zuǒ'],
        '右': ['yòu'],
        '里': ['lǐ'],
        '外': ['wài'],
        
        // 其他常用字
        '的': ['de'],
        '了': ['le'],
        '着': ['zhe'],
        '过': ['guò'],
        '吗': ['ma'],
        '呢': ['ne'],
        '啊': ['a'],
        '哦': ['ó'],
        '呀': ['ya'],
        '吧': ['ba']
    },

    // 扩展字典（生僻字和词组）
    extDict: {
        // 生僻字
        '龘': ['dá'],
        '龙': ['lóng'],
        '龛': ['kān'],
        '龚': ['gōng'],
        '龟': ['guī'],
        '龠': ['yuè'],
        '鑫': ['xīn'],
        '鸯': ['yāng'],
        '鸳': ['yuān'],
        '鸾': ['luán'],
        '鸿': ['hóng'],
        '鹏': ['péng'],
        '鹤': ['hè'],
        '鹰': ['yīng'],
        
        // 多音字
        '长': ['cháng', 'zhǎng'],  // 长度/成长
        '乐': ['lè', 'yuè'],      // 快乐/音乐
        '行': ['xíng', 'háng'],   // 行走/行业
        '差': ['chā', 'chà'],     // 差别/差劲
        '好': ['hǎo', 'hào'],     // 好的/好友
        '着': ['zhe', 'zhuó'],    // 着急/着重
        '还': ['hái', 'huán'],    // 还有/归还
        '系': ['xì', 'jì'],       // 系统/联系
        
        // 姓氏特殊读音
        '曾': ['zēng', 'céng'],   // 姓氏/曾经
        '华': ['huá', 'huà'],     // 姓氏/华丽
        '翟': ['zhái', 'dí'],     // 姓氏
        '单': ['shàn', 'dān'],    // 姓氏/单个
        '解': ['xiè', 'jiě'],     // 姓氏/解释
        '朴': ['piáo', 'pǔ'],     // 姓氏/朴实
        '查': ['zhā', 'chá'],     // 姓氏/查找
        '秘': ['bì', 'mì'],       // 姓氏/秘密
        
        // 常用词组
        '中国': ['zhōng guó'],
        '北京': ['běi jīng'],
        '上海': ['shàng hǎi'],
        '广州': ['guǎng zhōu'],
        '深圳': ['shēn zhèn'],
        '天气': ['tiān qì'],
        '时间': ['shí jiān'],
        '学习': ['xué xí'],
        '工作': ['gōng zuò'],
        '生活': ['shēng huó'],
        '朋友': ['péng you'],
        '家人': ['jiā rén'],
        '电脑': ['diàn nǎo'],
        '手机': ['shǒu jī'],
        '互联网': ['hù lián wǎng'],
        '人工智能': ['rén gōng zhì néng'],
        
        // 常用成语
        '一帆风顺': ['yī fān fēng shùn'],
        '万事如意': ['wàn shì rú yì'],
        '不可思议': ['bù kě sī yì'],
        '全力以赴': ['quán lì yǐ fù'],
        '与众不同': ['yǔ zhòng bù tóng'],
        '脚踏实地': ['jiǎo tà shí dì'],
        '开门见山': ['kāi mén jiàn shān'],
        '守株待兔': ['shǒu zhū dài tù']
    },

    // 修改转换函数以支持词组和多音字
    convert(text, options = {}) {
        const {
            toneType = 'symbol',
            separator = ' ',
            caseType = 'lower',
            useNameMode = false
        } = options;

        // 先尝试匹配词组
        for (let phrase in this.extDict) {
            if (text.includes(phrase) && phrase.length > 1) {
                text = text.replace(new RegExp(phrase, 'g'), 
                    `[${this.extDict[phrase][0]}]`);
            }
        }

        // 处理单字
        const result = text.split(/(\[[^\]]+\]|.)/).filter(Boolean).map(char => {
            // 如果是词组（被方括号包围），直接处理
            if (char.startsWith('[') && char.endsWith(']')) {
                let py = char.slice(1, -1);
                return this.processPinyin(py, toneType, caseType);
            }

            // 如果是单字
            if (!/[\u4e00-\u9fa5]/.test(char)) {
                return char;
            }

            // 获取拼音，优先使用扩展字典
            let py;
            if (useNameMode && this.extDict[char]) {
                // 姓氏模式下使用第一个读音
                py = this.extDict[char][0];
            } else if (this.dict[char]) {
                py = this.dict[char][0];
            } else if (this.extDict[char]) {
                py = this.extDict[char][0];
            } else {
                return char;
            }

            return this.processPinyin(py, toneType, caseType);
        });

        return result.join(separator);
    },

    // 处理拼音的声调和大小写
    processPinyin(py, toneType, caseType) {
        // 处理声调
        if (toneType === 'num') {
            for (let tone in this.tones) {
                py = py.replace(new RegExp(tone, 'g'), this.tones[tone]);
            }
        } else if (toneType === 'none') {
            for (let tone in this.tones) {
                py = py.replace(new RegExp(tone, 'g'), this.tones[tone][0]);
            }
        }

        // 处理大小写
        switch (caseType) {
            case 'upper':
                return py.toUpperCase();
            case 'capitalize':
                return py.split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
            default:
                return py.toLowerCase();
        }
    }
}; 