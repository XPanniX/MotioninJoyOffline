var MIJconfig;
var Devices;
var Cname = new Array();
Cname['11.ff.33.41.00.00'] = 'PXN-8601/PXN-8633';
Cname['83.80.21.65.00.00'] = 'BTP-2165';
Cname['83.80.21.88.00.00'] = 'BTP-2186';
Cname['14.6b.03.02.00.00'] = 'BTP-2269';
Cname['12.bd.c0.03.00.00'] = 'BTP-2118';
Cname['0e.8f.00.03.00.00'] = 'BTP-C036';
Cname['00.79.00.06.00.00'] = 'Generic game controller';
Cname['1c.13.67.08.00.00'] = 'ALEC Game pad';
$(function ()
{
    SetBusy(false);
    $("#BatteryBar").progressbar(
    {
        value: 3
    });
    $("#batteryLev").html(0 + '%');
    $("#tabs").tabs(
    {
        event: 'mouseover'
    });
    $("#lMotor").slider(
    {
        animate: true,
        range: "min",
        min: 0,
        max: 150,
        value: 100,
        change: function (event, ui)
        {
            $("#lMotorV").html($("#lMotor").slider('option', 'value') + '%')
        }
    });
    $("#rMotor").slider(
    {
        animate: true,
        range: "min",
        min: 0,
        max: 150,
        value: 100,
        change: function (event, ui)
        {
            $("#rMotorV").html($("#rMotor").slider('option', 'value') + '%')
        }
    });
    $('#DXinputPList').click(function ()
    {
        $(":input[@type=radio]").filter('[value=4]').attr('checked', true)
    });
    $('#XinputPList').click(function ()
    {
        $(":input[@type=radio]").filter('[value=5]').attr('checked', true)
    });
    $('#CustomPList').click(function ()
    {
        $(":input[@type=radio]").filter('[value=0]').attr('checked', true)
    });
    if (VersionTool >= VER)
    {
        try
        {
            MIJconfig = GetConfig();
            Devices = GetDevices();
            init(MIJconfig)
        }
        catch (err)
        {
            DisplayMessage(err.description)
        }
        $('#Enable').click(function ()
        {
            getValue(MIJconfig);
            SaveConfig(MIJconfig);
            mmm(Mxxx, Myyy, Mvvvv)
        });
        $("a.pConfig").click(function ()
        {
            getValue(MIJconfig);
            SaveConfig(MIJconfig)
        });
        $("#ControllerList").change(function ()
        {
            MIJconfig['index'] = $("#ControllerList :selected").data('index')
        });
        $('#vibrationLeft').click(function ()
        {
            //getValue(MIJconfig);
            //SaveConfig(MIJconfig);
            if ($("#ControllerList :selected").data('index') != undefined)
            {
                Vibration($("#ControllerList :selected").data('index')[0], $("#ControllerList :selected").data('index')[1], 0, 255);
                setTimeout('stopVibration()', 2000);
                mmm(Mxxx, Myyy, Mvvvv)
            }
        });
        $('#vibrationRight').click(function ()
        {
            //getValue(MIJconfig);
            //SaveConfig(MIJconfig);
            if ($("#ControllerList :selected").data('index') != undefined)
            {
                Vibration($("#ControllerList :selected").data('index')[0], $("#ControllerList :selected").data('index')[1], 255, 0);
                setTimeout('stopVibration()', 2000);
                mmm(Mxxx, Myyy, Mvvvv)
            }
        });
        $('#GPProperty').click(function ()
        {
            mmm(120, Myyy, Mvvvv);
            cPannel()
        });
        $('#Disconnect').click(function ()
        {
            if ($("#ControllerList :selected").data('index') != undefined)
            {
                DisconnectController($("#ControllerList :selected").data('index')[0], $("#ControllerList :selected").data('index')[1]);
                mmm(Mxxx, -20, Mvvvv)
            }
        });
        timer()
    }
});

function timer()
{
    if ($("#ControllerList :selected").data('index') != undefined)
    {
        Devices = GetDevices();
        var Controller = Devices['nodes'][$("#ControllerList :selected").data('index')[0]].controllers;
        if (Controller != undefined)
        	displayPower(Controller[$("#ControllerList :selected").data('index')[1]].Power)
    }
    else
    {
        $("#BatteryBar").progressbar('option', 'value', 0);
        $("#batteryLev").html(0 + '%')
    }
    setTimeout('timer()', 1000)
}
function stopVibration()
{
    Vibration($("#ControllerList :selected").data('index')[0], $("#ControllerList :selected").data('index')[1], 0, 0)
}
function init(cg)
{
    if (cg['FirstRun'])
    {
        cg['FirstRun'] = false;
        SaveConfig(cg)
    }
    displayDevice();
    $(".ModeLists :input[@type=radio]").filter('[value=' + cg['cmOptions'].mode + ']').attr('checked', true);
    $("#lMotor").slider('option', 'value', cg['cmOptions'].rMotor);
    $("#rMotor").slider('option', 'value', cg['cmOptions'].lMotor);
    var led = cg['cmOptions'].LED;
    if ((led & 0x80) == 0x00)
    {
        $('#LEDMODE1').attr('checked', true)
    }
    else
    {
        $('#LEDMODE2').attr('checked', true);
        if ((led & 0x01) != 0) $('#LED1').attr('checked', true);
        if ((led & 0x02) != 0) $('#LED2').attr('checked', true);
        if ((led & 0x04) != 0) $('#LED3').attr('checked', true);
        if ((led & 0x08) != 0) $('#LED4').attr('checked', true)
    }
    $('#DXinputPList').html('');
    for (var pf in cg['dxinputOptions'])
    {
        $('<option value="' + pf + '">' + cg['dxinputOptions'][pf].name + '</option>').appendTo('#DXinputPList')
    }
    $('#XinputPList').html('');
    for (var pf in cg['xinputOptions'])
    {
        $('<option value="' + pf + '">' + cg['xinputOptions'][pf].name + '</option>').appendTo('#XinputPList')
    }
    $('#CustomPList').html('');
    for (var pf in cg['customOptions'])
    {
        $('<option value="' + pf + '">' + cg['customOptions'][pf].name + '</option>').appendTo('#CustomPList')
    }
}
function displayDevice()
{
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
function displayPower(power)
{
    switch (power)
    {
    case 0xee:
        var value = $("#BatteryBar").progressbar('option', 'value') + 20;
        if (value > 100)
        {
            value = 20
        }
        $("#BatteryBar").progressbar('option', 'value', value);
        $("#batteryLev").html('');
        break;
    case 5:
    case 0xef:
        $("#BatteryBar").progressbar('option', 'value', 100);
        $("#batteryLev").html(100 + '%');
        break;
    case 4:
        $("#BatteryBar").progressbar('option', 'value', 80);
        $("#batteryLev").html(80 + '%');
        break;
    case 3:
        $("#BatteryBar").progressbar('option', 'value', 60);
        $("#batteryLev").html(60 + '%');
        break;
    case 2:
        $("#BatteryBar").progressbar('option', 'value', 40);
        $("#batteryLev").html(40 + '%');
        break;
    case 1:
        $("#BatteryBar").progressbar('option', 'value', 10);
        $("#batteryLev").html(10 + '%');
        break;
    default:
        $("#BatteryBar").progressbar('option', 'value', 3);
        $("#batteryLev").html(0 + '%');
        break
    }
}
function getValue(cg)
{
    cg['cmOptions'].mode = $(":radio[name='mode'][checked]").val();
    cg['cmOptions'].lMotor = $("#rMotor").slider('option', 'value');
    cg['cmOptions'].rMotor = $("#lMotor").slider('option', 'value');
    cg['dindex'] = $("#ControllerList :selected").data('index');
    var led = 0x00;
    switch ($(":radio[name='LED'][checked]").val())
    {
    case '0':
        break;
    case '1':
        led = 0x80;
        if ($("#LED1").attr("checked")) led |= 0x01;
        if ($("#LED2").attr("checked")) led |= 0x02;
        if ($("#LED3").attr("checked")) led |= 0x04;
        if ($("#LED4").attr("checked")) led |= 0x08;
        break;
    default:
        break
    }
    cg['cmOptions'].LED = led;
    cg['inputIndex'][0] = $("#DXinputPList :selected").val();
    cg['inputIndex'][1] = $("#XinputPList :selected").val();
    cg['inputIndex'][2] = $("#CustomPList :selected").val()
}
function DeviceChange()
{
    Devices = GetDevices();
    displayDevice()
}
