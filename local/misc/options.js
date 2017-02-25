var MIJconfig;
$(function ()
{
    SetBusy(false);
    $.spin.imageBasePath = 'misc/images/';
    $('#AutoOffTime').spin(
    {
        interval: 1,
        min: 0,
        max: 127
    });
    $('#DeadzoneDefault').spin(
    {
        interval: 1,
        min: 0,
        max: 255
    });
    $('#ThresholdDefault').spin(
    {
        interval: 1,
        min: 0,
        max: 255
    });
    $("#MouseSpeed").slider(
    {
        animate: true,
        range: "min",
        min: 1,
        max: 7,
        value: 4,
        change: function (event, ui)
        {
            $("#MouseSpeedValue").text("1/" + $(this).slider('option', 'value'))
        }
    });
    $("#MouseSpeedValue").text("1/" + $("#MouseSpeed").slider('option', 'value'));
    $("#MouseWheelSpeed").slider(
    {
        animate: true,
        range: "min",
        min: 1,
        max: 64,
        value: 16,
        change: function (event, ui)
        {
            $("#MouseWheelSpeedValue").text("1/" + $(this).slider('option', 'value'))
        }
    });
    $("#MouseWheelSpeedValue").text("1/" + $("#MouseWheelSpeed").slider('option', 'value'));
    $("#Deadzone > div").each(function ()
    {
        $(this).slider(
        {
            animate: true,
            range: "min",
            min: 0,
            max: 127,
            value: 12,
            change: function (event, ui)
            {
                $(".DeadzoneValue", this).text($(this).slider('option', 'value'))
            }
        });
        $(".DeadzoneValue", this).text($(this).slider('option', 'value'))
    });
    $("#Threshold > div").each(function ()
    {
        $(this).slider(
        {
            animate: true,
            range: "min",
            min: 0,
            max: 255,
            value: 64,
            change: function (event, ui)
            {
                $(".DeadzoneValue", this).text($(this).slider('option', 'value'))
            }
        });
        $(".DeadzoneValue", this).text($(this).slider('option', 'value'))
    });
    $('#OptionsDefault').click(function ()
    {
        $("#Deadzone > div").each(function ()
        {
            $(this).slider("option", "value", $('#DeadzoneDefault').val())
        });
        $("#Threshold > div").each(function ()
        {
            $(this).slider("option", "value", $('#ThresholdDefault').val())
        });
        $("#MouseSpeed").slider("option", "value", "4");
        $("#MouseWheelSpeed").slider("option", "value", "16")
    });
    if (VersionTool >= VER)
    {
        MIJconfig = GetConfig();
        init(MIJconfig);
        $('#OptionsEnable').click(function ()
        {
            getvalue(MIJconfig);
            SaveConfig(MIJconfig)
        })

        $('#GPProperty').click(function ()
        {
            mmm(120, Myyy, Mvvvv);
            cPannel()
        });
		displayDevice();
    }
});

function displayDevice()
{
	var Devices = GetDevices();
    var n = 0;
    for (var i in Devices['nodes'])
    {
        for (var j in Devices['nodes'][i].controllers)
        {
            if (!Devices['nodes'][i].controllers[j].Connected)
            {
                continue
            }
            var DeviceName = '';
            switch (Devices['nodes'][i].controllers[j].Type)
            {
            case 0:
                DeviceName = $('#USBDS3').html();
                break;
            case 1:
                DeviceName = $('#XBOX360WIRED').html();
                break;
            case 2:
                DeviceName = $('#XBOX360WIRELESS').html();
                break;
            case 3:
                DeviceName = $('#XBOXCONTROLLER').html();
                break;
            case 4:
                DeviceName = $('#USBPS3KEYPAD').html();
                break;
            case 5:
                DeviceName = $('#USBPSMOVE').html();
                break;
            case 6:
                DeviceName = $('#USBPSNAVIGATION').html();
                break;
            case 7:
                DeviceName = $('#ALECPAD').html();
                break;
            case 8:
                DeviceName = Cname[BDaddr2string(Devices['nodes'][i].BDAddr)];
                break;
            case 129:
                DeviceName = $('#BTDS3').html();
                break;
            case 130:
                DeviceName = $('#PS3KEYPAD').html();
                break;
            case 131:
                DeviceName = $('#PS3REMOTE').html();
                break;
            case 132:
                DeviceName = $('#WIIMOTE').html();
                break;
            case 133:
                DeviceName = $('#PSMOVE').html();
                break;
            case 134:
                DeviceName = $('#BTPSNAVIGATION').html();
                break;
            default:
                DeviceName = "Uknow Type";
                break
            }
            if (n == 0)
            {
                $('#ControllerList').html('')
            }
            n++;
            $('<option>' + n + '. ' + DeviceName + '</option>').appendTo('#ControllerList').data("index", [i, j])
        }
    }
    if (n == 0)
    {
        $('#ControllerList').html('<option>' + $('#NoController').html() + '</option>')
    }
}

function init(cg)
{
    var op = cg['cmOptions'];
    if (cg['AutoRun'])
    {
        $("#AutoRun").attr("checked", "checked")
    }
    if (cg['AutoUpdate'])
    {
        $("#AutoUpdate").attr("checked", "checked")
    }
    if (cg['SystemTray'])
    {
        $("#CloseExit").attr("checked", "checked")
    }
    if (op.AOFFT & 0x80)
    {
        $("#AutoOff").attr("checked", "checked")
    }
    $("#AutoOffTime").val(op.AOFFT & 0x7f);
    $('#MouseSpeed').slider('option', 'value', op.MSXY);
    $('#MouseWheelSpeed').slider('option', 'value', op.MSW);
    $('#LStick-X').slider('option', 'value', op.DZLX);
    $('#LStick-Y').slider('option', 'value', op.DZLY);
    $('#RStick-X').slider('option', 'value', op.DZRX);
    $('#RStick-Y').slider('option', 'value', op.DZRY);
    $('#Triangle').slider('option', 'value', op.THT);
    $('#Circle').slider('option', 'value', op.THCi);
    $('#Cross').slider('option', 'value', op.THCr);
    $('#Square').slider('option', 'value', op.THS);
    $('#L2').slider('option', 'value', op.THL2);
    $('#R2').slider('option', 'value', op.THR2);
    $('#L1').slider('option', 'value', op.THL1);
    $('#R1').slider('option', 'value', op.THR1);
    $('#DpadUp').slider('option', 'value', op.THU);
    $('#DpadRight').slider('option', 'value', op.THR);
    $('#DpadDown').slider('option', 'value', op.THD);
    $('#DpadLeft').slider('option', 'value', op.THL)
}
function getvalue(cg)
{
    var op = cg['cmOptions'];
    cg['AutoRun'] = ($("#AutoRun").attr("checked") == "checked");
    cg['AutoUpdate'] = ($("#AutoUpdate").attr("checked") == "checked");
    cg['SystemTray'] = ($("#CloseExit").attr("checked") == "checked");
    op.AOFFT = 0;
    if ($("#AutoOff").attr("checked") == "checked")
    {
        op.AOFFT = 0x80
    }
    op.AOFFT |= $("#AutoOffTime").val();
    op.MSXY = $('#MouseSpeed').slider('option', 'value');
    op.MSW = $('#MouseWheelSpeed').slider('option', 'value');
    op.DZLX = $('#LStick-X').slider('option', 'value');
    op.DZLY = $('#LStick-Y').slider('option', 'value');
    op.DZRX = $('#RStick-X').slider('option', 'value');
    op.DZRY = $('#RStick-Y').slider('option', 'value');
    op.THT = $('#Triangle').slider('option', 'value');
    op.THCi = $('#Circle').slider('option', 'value');
    op.THCr = $('#Cross').slider('option', 'value');
    op.THS = $('#Square').slider('option', 'value');
    op.THL2 = $('#L2').slider('option', 'value');
    op.THR2 = $('#R2').slider('option', 'value');
    op.THL1 = $('#L1').slider('option', 'value');
    op.THR1 = $('#R1').slider('option', 'value');
    op.THU = $('#DpadUp').slider('option', 'value');
    op.THR = $('#DpadRight').slider('option', 'value');
    op.THD = $('#DpadDown').slider('option', 'value');
    op.THL = $('#DpadLeft').slider('option', 'value')
}
function DeviceChange()
{
    displayDevice()
}
