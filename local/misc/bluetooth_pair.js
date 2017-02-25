var MIJconfig;
var Devices;
$(function ()
{
    SetBusy(false);
    $("#CustomBDAddr").val('00.00.00.00.00.00');
    $.mask.definitions['h'] = '[a-f0-9A-F]';
    $("#CustomBDAddr").mask("hh.hh.hh.hh.hh.hh", {
        placeholder: " "
    });
    $("#CustomBDAddr").focus(function ()
    {
        $(":input[@type=radio]").filter('[value=1]').attr('checked', true)
    });
    if (VersionTool >= VER)
    {
        MIJconfig = GetConfig();
        Devices = GetDevices();
        displayDevice();
        $('#BTPairEnable').click(function ()
        {
            switch ($(":radio[name='mode'][checked]").val())
            {
            case '0':
                BTPair($("#DS3USBList :selected").data('index'), $('#BDaddr').html());
                break;
            case '1':
                BTPair($("#DS3USBList :selected").data('index'), $("#CustomBDAddr").val());
                break;
            default:
                break
            }
            DeviceChange()
        })
    }
});

function displayDevice()
{
    var bt = 0;
    var usb = 0;
    $('#AdapterList').html('');
    $('#DS3USBList').html('');
    for (var i in Devices['nodes'])
    {
        switch (Devices['nodes'][i].DeviceType)
        {
        case 0:
            usb++;
            $('<option>' + usb + '. ' + $('#DS3USBName').html() + '</option>').appendTo('#DS3USBList').data("index", i);
            break;
        case 1:
            bt++;
            $('<option>' + bt + '. ' + $('#BTAdapterName').html() + '</option>').appendTo('#AdapterList').data("index", i);
            break;
        case 5:
            usb++;
            $('<option>' + usb + '. ' + $('#DS3USBName').html() + '</option>').appendTo('#DS3USBList').data("index", i);
            break;
        case 6:
            usb++;
            $('<option>' + usb + '. ' + $('#PSMOVE').html() + '</option>').appendTo('#DS3USBList').data("index", i);
            break;
        default:
            break
        }
    }
    if (usb == 0)
    {
        $('#DS3USBList').html('<option>' + $('#NoDS3USB').html() + '</option>')
    }
    else
    {
        try
        {
            var ud = Devices['nodes'][$("#DS3USBList :selected").data('index')];
            var cd = Devices['nodes'][$("#DS3USBList :selected").data('index')].controllers[0];
            $('#ds3addr').html(ud.BDAddr[0].toString(16) + '.' + ud.BDAddr[1].toString(16) + '.' + ud.BDAddr[2].toString(16) + '.' + ud.BDAddr[3].toString(16) + '.' + ud.BDAddr[4].toString(16) + '.' + ud.BDAddr[5].toString(16));
            $('#DS3MAC').html(cd.BDAddr[0].toString(16) + '.' + cd.BDAddr[1].toString(16) + '.' + cd.BDAddr[2].toString(16) + '.' + cd.BDAddr[3].toString(16) + '.' + cd.BDAddr[4].toString(16) + '.' + cd.BDAddr[5].toString(16))
        }
        catch (err)
        {}
    }
    if (bt == 0)
    {
        $('#AdapterList').html('<option>' + $('#NoBTAdapter').html() + '</option>')
    }
    else
    {
        try
        {
            var ad = Devices['nodes'][$("#AdapterList :selected").data('index')];
            $('#BDaddr').html(ad.BDAddr[0].toString(16) + '.' + ad.BDAddr[1].toString(16) + '.' + ad.BDAddr[2].toString(16) + '.' + ad.BDAddr[3].toString(16) + '.' + ad.BDAddr[4].toString(16) + '.' + ad.BDAddr[5].toString(16));
            $('#BDManuf').html($('#BTM' + ad.Manufacturer).html());
            $('#BDHCIVer').html(ad.HCIVersion + '.' + ad.HCIRevision.toString(16));
            $('#BDLMPVer').html(ad.LMPVersion + '.' + ad.LMPSubVersion.toString(16))
        }
        catch (err)
        {}
    }
}
function DeviceChange()
{
    Devices = GetDevices();
    displayDevice()
}
