var that;
//存放卡片
// c表示黑桃 d表示红方块 h表示红桃 s表示黑桃
var arr = ["c_02", "c_03", "c_04", "c_05", "c_06", "c_07", "c_08", "c_09",
    "c_10", "c_11", "c_12", "c_13", "c_14", "d_02", "d_03", "d_04", "d_05", "d_06", "d_07", "d_08", "d_09",
    "d_10", "d_11", "d_12", "d_13", "d_14", "h_02", "h_03", "h_04", "h_05", "h_06", "h_07", "h_08", "h_09",
    "h_10", "h_11", "h_12", "h_13", "h_14", "s_02", "s_03", "s_04", "s_05", "s_06", "s_07", "s_08", "s_09",
    "s_10", "s_11", "s_12", "s_13", "s_14"
];
// 存储玩家的手牌
var player1 = [];
var player2 = [];
// 存储玩家手牌的点数
var value1 = [];
var value2 = [];
// 存储玩家手牌花色
var color1 = [];
var color2 = [];
var count1 = 0,
    count2 = 0;
var flag = 2;
class playCards {
    constructor(id) {
            that = this;
            // 获取所需要的元素
            this.main = document.querySelector(id);
            //获取玩家一的手牌
            this.ul = this.main.querySelectorAll('.top-show ul');
            this.li = this.ul[0].querySelectorAll('li');

            this.lis = this.ul[1].querySelectorAll('li');
            //获取玩家一弃牌 看牌两个按钮
            this.btn1 = this.main.querySelector('.btn1');
            this.btn2 = this.main.querySelector('.btn2');
            //获取玩家二弃牌 看牌两个按钮
            this.btn3 = this.main.querySelector('.btn3');
            this.btn4 = this.main.querySelector('.btn4');
            // 获取发牌按钮
            this.btns = this.main.querySelector('.nav ul button');
            // 获取盒子
            this.top = this.main.querySelectorAll('.top-hidden');
            //获取比较大小的按钮
            this.box = this.main.querySelector('.box');
            this.init();
        }
        //初始化
    init() {
            this.btns.onclick = function() {
                arr.sort(function() {
                    return 0.5 - Math.random();
                });
                for (var i = 0; i < that.li.length; i++) {
                    that.li[i].firstElementChild.src = "back.jpg";
                    that.lis[i].firstElementChild.src = "back.jpg";
                }
                that.btn2.style.visibility = "visible";
                that.btn4.style.visibility = "visible";
                that.top[0].style.display = "block";
                that.top[1].style.display = "block";
                that.box.style.display = "block";
                if (flag == 0) {
                    flag = 2;
                }
            }

            that.show();
        }
        //功能 点击按钮将牌显示出来
    show() {
        that.btn1.onclick = function() {
            that.btn1.style.animation = "null";
            player1 = [];
            for (var i = 0; i < that.li.length; i++) {
                that.li[i].firstElementChild.src = "back.jpg";
            }
        }
        that.btn2.onclick = function() {
            for (var i = 0; i < that.li.length; i++) {
                // 保存玩家一的牌
                player1.push(arr[i]);
                // 保存玩家一手牌点数
                value1.push(parseInt(player1[i].slice(2, 4)));
                // 保存玩家一手牌花色
                color1.push(player1[i].slice(0, 1));
                var url = arr[i];
                that.li[i].firstElementChild.src = "images/" + url + ".jpg";
            }
            value1.sort(function(a, b) { return a - b });
            flag--;
            that.btn2.style.visibility = "hidden";
        }
        that.btn3.onclick = function() {
            that.btn3.style.animation = "null";
            player2 = [];
            for (var i = 0; i < that.lis.length; i++) {
                that.lis[i].firstElementChild.src = "back.jpg";
            }
        }
        that.btn4.onclick = function() {
            for (var i = 0, k = 3; i < that.lis.length; i++, k++) {
                // 保存玩家二的牌
                player2.push(arr[k]);
                // 保存玩家二手牌点数
                value2.push(parseInt(player2[i].slice(2, 4)));
                // 保存玩家二手牌花色
                color2.push(player2[i].slice(0, 1));
                var path = arr[k];
                // console.log(url);
                that.lis[i].firstElementChild.src = "images/" + path + ".jpg";
            }
            value2.sort(function(a, b) { return a - b });
            flag--;
            that.btn4.style.visibility = "hidden";
        }
        that.battle();
    }
    battle() {
        var one = {
            baozi: false,
            shunjin: false,
            jinhua: false,
            shunzi: false,
            duizi: false,
            danzhang: true,
        };
        var two = {
            baozi: false,
            shunjin: false,
            jinhua: false,
            shunzi: false,
            duizi: false,
            danzhang: true,
        };
        that.box.onclick = function() {
            // value1;
            if (flag != 0) {
                alert("请先看牌");
                return;
            }
            if (count1 != 0 && count2 != 0) {
                count1 = 0;
                count2 = 0;
            }
            a1();
            if (one.baozi || two.baozi) {
                if (one.baozi && !two.baozi) {
                    if (two.danzhang && value2[0] == 2 && value2[1] == 3 && value2[2] == 5) {
                        alert("玩家二获胜");
                    } else {
                        alert("玩家一获胜");
                    }
                } else if (!one.baozi && two.baozi) {
                    if (one.danzhang && value1[0] == 2 && value1[1] == 3 && value1[2] == 5) {
                        alert("玩家一获胜");
                    } else {
                        alert("玩家二获胜");
                    }
                } else if (one.baozi && two.baozi) {
                    if (count1 > count2) {
                        alert("玩家一获胜");
                    } else {
                        alert("玩家二获胜");
                    }
                }
            } else if (one.shunjin || two.shunjin) {
                if (one.shunjin && !two.shunjin) {
                    alert("玩家一获胜")
                } else if (!one.shunjin && two.shunjin) {
                    alert("玩家二获胜")
                } else if (one.shunjin && two.shunjin) {
                    if (count1 > count2) {
                        alert("玩家一获胜")
                    } else if (count1 == count2) {
                        alert("平局")
                    } else {
                        alert("玩家二获胜")
                    }
                }

            } else if (one.jinhua || two.jinhua) {
                if (one.jinhua && !two.jinhua) {
                    alert("玩家一获胜");
                } else if (!one.jinhua && two.jinhua) {
                    alert("玩家二获胜");
                } else if (one.jinhua && two.jinhua) {
                    if (value1[2] > value2[2]) {
                        alert("玩家一获胜");
                    } else if (value1[2] == value2[2]) {
                        if (value1[1] > value2[1]) {
                            alert("玩家一获胜");
                        } else if (value1[1] == value2[1]) {
                            if (value1[0] > value2[0]) {
                                alert("玩家一获胜");
                            } else {
                                alert("玩家二获胜");
                            }
                        } else {
                            alert("玩家二获胜");
                        }
                    } else {
                        alert("玩家二获胜");
                    }
                }
            } else if (one.shunzi || two.shunzi) {
                if (one.shunzi && !two.shunzi) {
                    alert("玩家一获胜")
                } else if (!one.shunzi && two.shunzi) {
                    alert("玩家二获胜")
                } else if (one.shunzi && two.shunzi) {
                    if (count1 > count2) {
                        alert("玩家一获胜")
                    } else if (count1 == count2) {
                        alert("平局")
                    } else {
                        alert("玩家二获胜")
                    }
                }
            } else if (one.duizi || two.duizi) {
                if (one.duizi && !two.duizi) {
                    alert("玩家一获胜");
                } else if (!one.duizi && two.duizi) {
                    alert("玩家二获胜");
                } else if (one.duizi && two.duizi) {
                    if (n > k) {
                        alert("玩家一获胜");
                    } else if (n = k) {
                        if (count1 - 2 * n > count2 - 2 * k) {
                            alert("玩家一获胜");
                        } else if (count1 - 2 * n == count2 - 2 * k) {
                            alert("平局");
                        } else {
                            alert("玩家二获胜");
                        }
                    }
                }
            } else if (one.danzhang && two.danzhang) {
                if (value1[2] > value2[2]) {
                    alert("玩家一获胜");
                } else if (value1[2] == value2[2]) {
                    if (value1[1] > value2[1]) {
                        alert("玩家一获胜");
                    } else if (value1[1] == value2[1]) {
                        if (value1[0] > value2[0]) {
                            alert("玩家一获胜");
                        } else {
                            alert("玩家二获胜");
                        }
                    } else {
                        alert("玩家二获胜");
                    }
                } else {
                    alert("玩家二获胜");
                }
            }
            player1 = [];
            player2 = [];
            value1 = [];
            value2 = [];
            color1 = [];
            color2 = [];
            one = {
                baozi: false,
                shunjin: false,
                jinhua: false,
                shunzi: false,
                duizi: false,
                danzhang: true,
            };
            two = {
                baozi: false,
                shunjin: false,
                jinhua: false,
                shunzi: false,
                duizi: false,
                danzhang: true,
            };
        }

        function a1() {
            var n = 0,
                k = 0;
            for (var i = 0; i < 3; i++) {
                count1 += value1[i];
                count2 += value2[i];
            }
            // 判断是否为豹子
            if (value1[0] == value1[1] && value1[1] == value1[2]) {
                one.baozi = true;
                one.danzhang = false;
            }
            if (value2[0] == value2[1] && value2[1] == value2[2]) {
                two.baozi = true;
                two.danzhang = false;
            }
            // 判断是否为金花
            if (color1[0] == color1[1] && color1[1] == color1[2]) {
                one.jinhua = true;
                one.danzhang = false;
            }
            if (color2[0] == color2[1] && color2[1] == color2[2]) {
                two.jinhua = true;
                two.danzhang = false;
            }
            // 判断是否为顺子
            if (value1[0] + 1 == value1[1] && value1[1] + 1 == value1[2] || value1[0] + 1 == value1[1] && value1[0] + 12 == value1[2]) {
                one.shunzi = true;
                one.danzhang = false;
            }
            if (value2[0] + 1 == value2[1] && value2[1] + 1 == value2[2] || value2[0] + 1 == value2[1] && value2[0] + 12 == value2[2]) {
                two.shunzi = true;
                two.danzhang = false;
            }
            // 判断是否为顺金
            if (one.jinhua && one.shunzi) {
                one.shunjin = true;
                one.danzhang = false;
            }
            if (two.jinhua && two.shunzi) {
                two.shunjin = true;
                two.danzhang = false;
            }
            // 判断是否为对子
            if (value1[0] == value1[1] && value1[1] != value1[2] || value1[0] == value1[2] && value1[0] != value1[1] || value1[0] != value1[1] && value1[1] == value1[2]) {
                one.duizi = true;
                one.danzhang = false;
            }
            if (value2[0] == value2[1] && value2[1] != value2[2] || value2[0] == value2[2] && value2[0] != value2[1] || value2[0] != value2[1] && value2[1] == value2[2]) {
                two.duizi = true;
                two.danzhang = false;
            }
            // 找到哪两个数是一对
            if (one.duizi) {
                if (value1[0] == value1[1]) {
                    n = value1[0];
                } else {
                    n = value1[2];
                }
            }
            if (two.duizi) {
                if (value2[0] == value2[1]) {
                    k = value2[0];
                } else {
                    k = value2[2];
                }
            }
        }
    }
}
new playCards('.container');