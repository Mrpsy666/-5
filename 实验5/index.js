$(document).ready(function(){
    let judeg = 0;
    $('#main-info').hide();
    displayDateTime();
    let row;
    $('#main-info').on('click', '.change', function(){
        row = $(this).closest('tr');
        let cover = row.find('img').attr('src');
        let title = row.find('td:eq(1)').text();
        let type = row.find('td:eq(2)').text();
        let area = row.find('td:eq(3)').text();
        let actor = row.find('td:eq(4)').text();
        let releaseDate = row.find('td:eq(5)').text();
        let rating = row.find('td:eq(6)').text();

        $('#modifyModal #cover').val(cover);
        $('#title').val(title);
        $('#type').val(type);
        $('#area').val(area);
        $('#actor').val(actor);
        $('#releaseDate').val(releaseDate);
        $('#rating').val(rating);
    $('#modifyModal').modal('show');
});
$('#submitBtn').click(function(){
      let cover = $('#cover').val();
      let title = $('#title').val();
      let type = $('#type').val();
      let area = $('#area').val();
      let actor = $('#actor').val();
      let releaseDate = $('#releaseDate').val();
      let rating = $('#rating').val();

      row.find('img').attr('src', cover);
      row.find('td:eq(1)').text(title);
      row.find('td:eq(2)').text(type);
      row.find('td:eq(3)').text(area);
      row.find('td:eq(4)').text(actor);
      row.find('td:eq(5)').text(releaseDate);
      row.find('td:eq(6)').text(rating);

      $('#modifyModal').modal('hide');
});

    $('#add').click(function (){
         $('#addcover').val('');
         $('#addModal').modal('show');
    });
    $('#addsubmitBtn').click(function (){
        let cover = $('#addcover').val();
      let title = $('#addtitle').val();
      let type = $('#addtype').val();
      let area = $('#addarea').val();
      let actor = $('#addactor').val();
      let releaseDate = $('#addreleaseDate').val();
      let rating = $('#addrating').val();

      let newRowHtml = `<tr>
                        <td><img src="${cover}"/></td>
                        <td>${title}</td>
                        <td>${type}</td>
                        <td>${area}</td>
                        <td>${actor}</td>
                        <td>${releaseDate}</td>
                        <td>${rating}</td>
                        <td>
                            <button class="change" type="button">Modify</button>
                            <button class="delete" type="button">Delete</button>
                        </td>
                    </tr>`;

      $('#main-info tbody').append(newRowHtml);
      $('#addModal').modal('hide')

    })
    $('#main-info').on('click', '.delete', function(){
        let a = confirm("确定要删除吗?");
        if(a){
            let row = $(this).closest('tr');
            row.remove();
        }
    });

    $('#send').click(function () {
                let dataToSend = [];
                let url = "http://192.168.99.203/lab/ajax/add.asp";
                $('#main-info tbody tr').each(function (index, row) {
                let rowData = {
                    cover: $(row).find('img').attr('src'),
                    title: $(row).find('td:eq(1)').text(),
                    type: $(row).find('td:eq(2)').text(),
                    area: $(row).find('td:eq(3)').text(),
                    actor: $(row).find('td:eq(4)').text(),
                    releaseDate: $(row).find('td:eq(5)').text(),
                    rating: $(row).find('td:eq(6)').text()
                };
                 let data={
                    appKey: "20080101",
                    info: rowData
                };
                $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    data: data,
                    dataType: "json",
                    success: function (response) {
                        if (response.code === 1) {
                            alert("成功：" + response.msg);
                        } else {
                            alert("失败：" + response.msg);
                        }
                    },
                    error: function () {
                        console.error("请求失败");
                    }
                });
                });
        });


    $('#reload').click(function () {
        if(judeg === 0){
            $('#showinfo').hide();
            $('#main-info').show();
            judeg++;
        }
        else{
            var url = "http://192.168.99.203/lab/ajax/get.asp";
            var appKey = "20080101";


            var data = {
                appKey: appKey
            };

            $.ajax({
                url: url,
                type: "GET",
                data: data,
                dataType: "json",
                success: function (response) {

                    if (response.code === 1) {
                        alert("成功：");
                        $('#main-info tbody').empty();

                        let ans = JSON.stringify(response);
                        ans = JSON.parse(ans);
                        for(let i=0;i<ans.data.length;i++){
                            let rowData = ans.data[i];
                                let newRowHtml = `<tr>
                                <td><img src="${rowData["info[cover]"]}"/></td>
                                <td>${rowData["info[title]"]}</td>
                                <td>${rowData["info[type]"]}</td>
                                <td>${rowData["info[area]"]}</td>
                                <td>${rowData["info[actor]"]}</td>
                                <td>${rowData["info[release]"]}</td>
                                <td>${rowData["info[rating]"]}</td>
                                <td>
                                    <button class="change" type="button">Modify</button>
                                    <button class="delete" type="button">Detele</button>
                                </td>
                            </tr>`;
                            $('#main-info tbody').append(newRowHtml);
                        };
                    } else {
                        alert("失败：" + response.msg);
                    }
                },
                error: function () {
                    console.error("请求失败");
                }
            });
        }

    });
    function clear(){
        var url = "http://192.168.99.203/lab/ajax/clear.asp";
        var appKey = "20080101";

        $.ajax({
            url: url,
            type: "GET",
            data: { appKey: appKey },
            dataType: "json",
            success: function (response) {
                if(response.code === 1){
                    alert("后端数据清除成功");
                    return true;

                }
                else{
                    alert("后端数据清除失败");
                }
            },
            error: function (error) {
                console.error("请求失败:", error);
            }
        });
        return false;
    }
    $('#clear').click(clear);

        function displayDateTime() {
            var currentDateTime = new Date();
            var year = currentDateTime.getFullYear();
            var month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
            var day = currentDateTime.getDate().toString().padStart(2, '0');
            var hours = currentDateTime.getHours().toString().padStart(2, '0');
            var minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
            var seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

            var dateTimeString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

            document.getElementById("dateTime").innerText = dateTimeString;
            setTimeout(displayDateTime, 1000);
        }
  });
