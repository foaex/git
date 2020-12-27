$(function() {
    const pro = provice;
    for (let i = 0; i < pro.length; i++) {
        var proOpt = $("<option></option>", {
            val: pro[i].name,
        });
        proOpt.html(pro[i].name);
        if (i < 10) {
            proOpt.attr("index", '0' + i);
        } else {
            proOpt.attr("index", i);
        }
        $('.provice').append(proOpt);
    }
    // 点击省份获取市区
    $('.provice').on('change', function() {
        $('.city').empty().append("<option>请选择市区</option>");
        $('.area').empty().append("<option>请选择县区</option>");
        let index = $(this).children('option:selected').attr("index");
        const city = provice[parseInt(index)].city;
        for (let i = 0; i < city.length; i++) {
            var cOpt = $("<option></option>", {
                val: city[i].name,
            });
            cOpt.html(city[i].name);
            if (i < 10) {
                cOpt.attr("index", index + '0' + i);
            } else {
                cOpt.attr("index", index + i);
            }
            $('.city').append(cOpt);
        }
    });
    // 点击城市获取县区
    $('.city').on('change', function() {
        $(".area").empty().append("<option>请选择县区</option>");
        let value = $(this).children('option:selected').attr("index");
        const area = provice[parseInt((value.substring(0, 2)))].city[parseInt(value.substring(2))].area;
        for (let i = 0; i < area.length; i++) {
            var areaOpt = $("<option></option>", {
                val: area[i],
            });
            areaOpt.html(area[i]);
            areaOpt.attr("index", value + i);
            $('.area').append(areaOpt);
        }
    })
});