//1.创建Tab栏
var that
class Tab {
    constructor(selector) { //selector=#tab;
        //2.获取元素
        this.main = document.querySelector(selector); //Tab容器栏
        this.ul = this.main.querySelector('ul'); //Tab栏标题容器
        this.lis = this.ul.children; //所有li的容器
        this.add = this.main.querySelector('.tabadd'); //添加按钮
        this.content = this.main.querySelector('.tabscon'); //内容容器
        this.sections = this.content.children; //所有section的容器

        this.init(); //调用init
        that = this
    };
    //3.1为元素绑定事件
    init() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].addEventListener('click', this.toggleTab); //3.2为每个li绑定点击事件
            this.lis[i].setAttribute('index', i) //4.2每个li新增自定义
            this.add.addEventListener('click', this.addTab) //5.3给添加按钮绑定点击事件
            this.lis[i].children[1].addEventListener('click', this.delTab)
            this.lis[i].children[0].addEventListener('dblclick', this.editorTab) //8.1给li的第一个span绑定双击事件
        };
    };
    //4.切换Tab栏功能
    toggleTab() {
        // console.log(1); //指向lis[i](点击对象)
        //4.1排他思想
        for (var i = 0; i < that.lis.length; i++) {
            that.lis[i].className = '';
            that.sections[i].className = '';
        }
        this.className = 'liactive';
        //4.3获取li的自定义属性
        var index = this.getAttribute('index');
        //4.4根据li获取的自定义属性来增加类名conactive
        that.sections[index].className = 'conactive'
    };
    //5.添加Tab栏功能
    addTab() {
        that.ul.innerHTML += '<li><span>new Tab</span><span class="close">×</span></li>' //5.1添加li
        that.content.innerHTML += ' <section>新内容</section>' //5.2添加section
        that.init() //5.4重新绑定事件，原因是innerHTML会把原先的元素覆盖，事件绑定丢失。
        that.ul.lastElementChild.click() //5.5让新增的li自动选定
    }
    delTab(e) {
        e.stopPropagation(); //7.1 因为li的删除导致事件冒泡，此为阻止事件冒泡
        var index = this.parentNode.getAttribute('index');
        if (this.parentNode.className == 'liactive') { //7.2 判断当li的类名中有liactive
            if (index > 0) {
                that.lis[index - 1].click() //7.3判断li的索引大于0（不是选择删除第一个），则选中上一个（索引减一）
            } else if (that.lis.length > 1) {
                that.lis[1].click() //7.4判断li的索引等于0（选择删除第一个），则选中第二个（索引加一）
            }
        }
        that.ul.removeChild(this.parentNode)
        that.content.removeChild(that.sections[index])
        that.init() //7.5因为删除打乱了之前给li的排序，所以重新调用init()，重新排序，避免影响下一次的删除
    }
    editorTab() {
        this.innerHTML = '<input type="text" value="' + this.innerText + '"> ' //8.2给span添加input
        this.children[0].select() //8.3 给第一个span选中
        this.children[0].addEventListener('blur', function() { //9.1给li的第一个span绑定鼠标失焦事件
            this.parentNode.innerHTML = this.value; //9.2将li的第一个span的value赋值给它上一级的li
        })
        this.children[0].addEventListener('keyup', function(e) { //9.3给li的第一个span绑定键盘按下事件
            if (e.keyCode == 13) { //9.4 判断按下的键值是否为13
                this.blur() //9.5调用blur
            }
        })
    }

};
var myTab = new Tab('#tab'); //创建Tab栏对象
// console.log(myTab);