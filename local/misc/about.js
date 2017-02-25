$(function ()
{
    SetBusy(false);
    if (VersionTool > 0)
    {
        $("#ds3toolver").html((VersionTool >> 20).toString(16) + '.' + ((VersionTool >> 16) & 0x0f).toString(16) + '.' + (Array(4).join(0) + (VersionTool & 0xffff).toString(16)).slice(-4));
        $("#driverver").html((VersionDriver >> 20).toString(16) + '.' + ((VersionDriver >> 16) & 0x0f).toString(16) + '.' + (Array(4).join(0) + (VersionDriver & 0xffff).toString(16)).slice(-4));
        $('#updateLocal').click(function ()
        {
            var MIJconfig;
            try
            {
                $.blockUI(
                {
                    message: 'Please wait a moment.',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
                MIJconfig = GetConfig();
                var localaddr = $(location).attr('pathname').replace('about', 'local');
                window.external.getscript('{"urls":["' + localaddr + '"]}', true);
                $.ajax(
                {
                    type: "post",
                    url: "/v070000/jsfiles",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data)
                    {
                        window.external.getscript($.toJSON(data), true)
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown)
                    {
                        alert(errorThrown)
                    }
                });
                MIJconfig['localaddr'] = localaddr;
                SaveConfig(MIJconfig);
                $.unblockUI()
            }
            catch (err)
            {
                DisplayMessage(err.description)
            }
        });
        $('#CheckUpdate').click(function ()
        {
            if (isNeedUpdata() == "True")
            {
                NeedUpdate()
            }
            else
            {
                NotUpdateInf()
            }
        })
    }
});
