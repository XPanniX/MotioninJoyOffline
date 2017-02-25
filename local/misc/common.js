var VersionTool = 0;
var VersionDriver = 0;
var VER = 0x060006;
var Mvvvv = 20;
var Mxxx = 0;
var Myyy = 12;
$(function ()
{
    $("ul.subnav").parent().append("<span></span>");
    $("ul.topnav li span").click(function ()
    {
        $(this).parent().find("ul.subnav").slideDown('fast').show();
        $(this).parent().hover(function ()
        {}, function ()
        {
            $(this).parent().find("ul.subnav").slideUp('slow')
        })
    }).hover(function ()
    {
        $(this).addClass("subhover")
    }, function ()
    {
        $(this).removeClass("subhover")
    });
    VersionTool = (typeof(window.external.getVersion) == 'undefined') ? 0 : window.external.getVersion(0);
    $('a.chlang').click(function ()
    {
        if (VersionTool >= VER)
        {
            setAppOptionstr(0, $(this).attr('lang'))
        }
        else
        {
            $.cookie("lang", $(this).attr('lang'), {
                expires: 365
            })
        }
    });
    if (VersionTool > 0)
    {
        VersionDriver = window.external.getVersion(1)
    }
    if (VersionTool > 0x060000)
    {
        $('a.Elevated').click(function ()
        {
            window.external.ConfigMotioninJoy(0, 2, 2, '')
        });
        $('a[target=_blank]').click(function ()
        {
            window.external.ConfigMotioninJoy(0, 1, 1, this.href);
            return false
        })
    }
});

function GetConfig()
{
    return eval('(' + window.external.MIJconfig(0, 0, "") + ')')
}
function SaveConfig(cg)
{
    return window.external.MIJconfig(1, 0, $.toJSON(cg))
}
function GetDevices()
{
    return eval('(' + window.external.MIJconfig(0, 2, "") + ')')
}
function mmm(x, y, v)
{
    if (VersionTool > 0x060000)
    {
        return window.external.ConfigMotioninJoy(1, (x << 8) | y, v, "")
    }
}
function Vibration(eIndex, cIndex, lvalue, rvalue)
{
    return window.external.ConfigMotioninJoy(3, (eIndex << 8) | cIndex, (lvalue << 8) | rvalue, "")
}
function setgpadinf(inf)
{
    return window.external.ConfigMotioninJoy(6, 4, 0, inf)
}
function PlaceDriver(index, type)
{
    return window.external.ConfigMotioninJoy(6, type, index, "")
}
function DriverInstall()
{
    return window.external.ConfigMotioninJoy(6, 2, 0, "")
}
function DriverRemove()
{
    return window.external.ConfigMotioninJoy(6, 3, 0, "")
}
function DisconnectController(index, controllerIndex)
{
    return window.external.ConfigMotioninJoy(4, index, controllerIndex, "")
}
function BTPair(index, BDAddr)
{
    return window.external.ConfigMotioninJoy(5, 0, index, BDAddr)
}
function cPannel()
{
    return window.external.ConfigMotioninJoy(0, 2, 0, "")
}
function getscript(files, overwrite)
{
    return window.external.getscript(files, overwrite)
}
function setAppOptionstr(type, value)
{
    return window.external.ConfigMotioninJoy(2, type, 0, value)
}
function GetBDRMmap()
{
    return eval('(' + window.external.MIJconfig(0, 3, "") + ')')
}
function SetBDRMmap(bdmap)
{
    return window.external.MIJconfig(1, 3, $.toJSON(bdmap))
}
function isNeedUpdata()
{
    return window.external.ConfigMotioninJoy(0, 2, 4, "")
}
function UpdataSoftware()
{
    return window.external.ConfigMotioninJoy(0, 2, 3, "")
}
function BDInquery(index)
{
    return window.external.ConfigMotioninJoy(7, 0, index << 8, "")
}
function BDInqueryCount(index)
{
    return window.external.ConfigMotioninJoy(7, 1, index << 8, "")
}
function BDRemoteAddr(index, Deviceindex)
{
    return window.external.ConfigMotioninJoy(7, 2, index << 8 | Deviceindex, "")
}
function BDRemoteName(index, addr)
{
    return window.external.ConfigMotioninJoy(7, 3, index << 8, addr)
}
function ConnectRemoteBD(index, addr)
{
    return window.external.ConfigMotioninJoy(7, 4, index << 8, addr)
}
function UpdateInf(index, info, percent)
{
    switch (index)
    {
    case 0:
        $("#download").progressbar('option', 'value', percent);
        break;
    case 1:
        $('#UpdateOne').html(info);
        $("#downloadOne").progressbar('option', 'value', percent);
        break;
    default:
        break
    }
}
function NotUpdateInf()
{
    $('#info').load('/update/noupdate').dialog(
    {
        show: 'blind',
        hide: 'blind',
        title: "No file need update",
        modal: false,
        height: 150,
        width: 340,
        buttons: {
            Ok: function ()
            {
                $(this).dialog("close")
            }
        }
    })
}
function NeedUpdate()
{
    $('#info').load('/update/available', function ()
    {
        $("#download").progressbar(
        {
            value: 0
        });
        $("#downloadOne").progressbar(
        {
            value: 0
        });
        $('a[target=_blank]').click(function ()
        {
            window.external.ConfigMotioninJoy(0, 0, 1, 0, 0, 0, 0, 0, this.href);
            return false
        });
        $("#info").dialog(
        {
            show: 'blind',
            hide: 'blind',
            title: "New version  available",
            modal: true,
            autoOpen: true,
            draggable: true,
            height: 180,
            width: 640,
            buttons: {
                Cancel: function ()
                {
                    $(this).dialog("close")
                },
                "Remind me after few days": function ()
                {
                    $(this).dialog("close");
                    $.cookie('Update', 'late', {
                        expires: 10
                    })
                },
                "Remind me next time": function ()
                {
                    $(this).dialog("close");
                    $.cookie('Update', 'NextTime', {
                        expires: 10
                    })
                },
                "Update Now": function ()
                {
                    if (VersionTool > 0x060000)
                    {
                        UpdataSoftware()
                    }
                    else
                    {
                        window.external.configDevice(8, 0, 0, 0, 0, 0)
                    }
                }
            }
        })
    })
}
function BDaddr2string(bdaddr)
{
    var i = 0;
    var s = bdaddr[0].toString(16);
    if (s.length < 2) s = "0" + s;
    var ad = s;
    for (i = 1; i < 6; i++)
    {
        var s = bdaddr[i].toString(16);
        if (s.length < 2) s = "0" + s;
        ad += '.' + s
    }
    return ad
}
function EventHander()
{
    switch (arguments[0])
    {
    case 1:
    	if (typeof DeviceChange == 'function')
            DeviceChange();
        break;
    default:
        break
    }
}
function DisplayMessage(message)
{
    message = "<p>There was an error.</p><p>" + message;
    message += "</p><p>Click OK to continue.</p>";
    $('#message').html(message);
    $("#message").dialog(
    {
        height: 240,
        modal: true,
        buttons: {
            Ok: function ()
            {
                $(this).dialog("close")
            }
        }
    })
}
function SetBusy(on)
{
//    if (on)
//    {
//        $('#busyinfo').html('<img src="misc/images/busy.gif"/>')
//    }
//    else
//    {
//        $('#busyinfo').html('')
//    }
}
function setConfirmUnload(on)
{
    window.onbeforeunload = (on) ? unloadMessage : null
}
function unloadMessage()
{
    return 'If you navigate away from this page without first saving your data, the changes will be lost.'
}
var DS3Obj = new Array('Triangle', 'Circle', 'Cross', 'Square', 'L1', 'R1', 'L2', 'R2', 'SELECT', 'L3', 'R3', 'START', 'PS', 'D-pad up', 'D-pad right', 'D-pad down', 'D-pad left', 'Triangle', 'Circle', 'Cross', 'Square', 'L2', 'R2', 'L1', 'R1', 'Dpad Up', 'Dpad Right', 'Dpad Down', 'Dpad Left', 'Left stick x+', 'Left stick x-', 'Left stick y+', 'Left stick y-', 'Right stick x+', 'Right stick x-', 'Right stick y+', 'Right stick y-', 'Front-tilt', 'Back-tilt', 'Left-tilt', 'Right-tilt');
var DS3Val = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40);
var X360Obj = new Array('A', 'B', 'X', 'Y', 'LB', 'RB', 'LT Digital', 'RT Digital', 'Back', 'Start', 'LS', 'RS', 'Guide', 'Up', 'Down', 'Left', 'Right', 'LT', 'RT', 'LS X+', 'LS X-', 'LS Y+', 'LS Y-', 'RS X+', 'RS X-', 'RS Y+', 'RS Y-');
var X360Val = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 29, 30, 31, 32, 33, 34, 35, 36);
var XboxObj = new Array('A', 'B', 'X', 'Y', 'Whitle', 'Black', 'LT Digital', 'RT Digital', 'Back', 'Start', 'LS', 'RS', 'Up', 'Down', 'Left', 'Right', 'LT', 'RT', 'LS X+', 'LS X-', 'LS Y+', 'LS Y-', 'RS X+', 'RS X-', 'RS Y+', 'RS Y-');
var XboxVal = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 21, 22, 29, 30, 31, 32, 33, 34, 35, 36);
var GgcObj = new Array('Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5', 'Button 6', 'Button 7', 'Button 8', 'Button 9', 'Button 10', 'Button 11', 'Button 12', 'Button 9+10', 'D-pad up', 'D-pad right', 'D-pad down', 'D-pad left', 'Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5', 'Button 6', 'Button 7', 'Button 8', 'Dpad Up', 'Dpad Right', 'Dpad Down', 'Dpad Left', 'Left stick x+', 'Left stick x-', 'Left stick y+', 'Left stick y-', 'Right stick x+', 'Right stick x-', 'Right stick y+', 'Right stick y-');
var GgcVal = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36);
