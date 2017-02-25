var MIJconfig;
var Devices;
$(function ()
{
    SetBusy(false);
    if (VersionTool >= VER)
    {
        MIJconfig = GetConfig();
        Devices = GetDevices();
        displayDevice();
        $('#BTPSPGOPair').click(function ()
        {
            mmm(Mxxx, Myyy, Mvvvv);
            BTPair($("#DS3USBList :selected").data('index'), $('#PSPGoMAC').html());
            BTPair($("#PSPGoList :selected").data('index'), $('#DS3MAC').html());
            DeviceChange()
        })
    }
});

function displayDevice()
{
    var bt = 0;
    var d3 = 0;
    $('#AdapterList').html('');
    $('#DS3USBList').html('');
    for (var i in Devices['nodes'])
    {
        switch (Devices['nodes'][i].DeviceType)
        {
        case 0:
            d3++;
            $('<option>' + d3 + '.' + $('#USBDS3').html() + '</option>').appendTo('#DS3USBList').data("index", i);
            break;
        case 7:
            bt++;
            $('<option>' + bt + '.' + $('#BTAdapterName').html() + '</option>').appendTo('#AdapterList').data("index", i);
            break;
        default:
            break
        }
    }
    if (d3 == 0)
    {
        $('#DS3USBList').html('<option>' + $('#NoDS3USB').html() + '</option>')
    }
    else
    {
        $('#ds3addr').html(Devices['nodes'][$("#DS3USBList :selected").data('index')].BDAddr)
    }
    if (bt == 0)
    {
        $('#AdapterList').html('<option>' + $('#NoBTAdapter').html() + '</option>')
    }
    else
    {
        var ad = Devices['nodes'][$("#AdapterList :selected").data('index')];
        $('#BDaddr').html(ad.BDAddr);
        $('#BDManuf').html($('#BTM' + ad.Manufacturer).html());
        $('#BDHCIVer').html(ad.HCIvision + '.' + ad.HCIRevision.toString(16));
        $('#BDLMPVer').html(ad.LMPVersion + '.' + ad.LMPSubVersion.toString(16))
    }
}
function displayDevice()
{
    var pg = 0;
    var d3 = 0;
    $('#PSPGoList').html('');
    $('#DS3USBList').html('');
    for (var i in Devices['nodes'])
    {
        switch (Devices['nodes'][i].DeviceType)
        {
        case 0:
            d3++;
            $('<option>' + d3 + '. ' + $('#DS3USBName').html() + '</option>').appendTo('#DS3USBList').data("index", i);
            break;
        case 1:
            pg++;
            $('<option>' + pg + '. ' + $('#PSPGoName').html() + '</option>').appendTo('#PSPGoList').data("index", i);
            break;
        case 5:
            d3++;
            $('<option>' + d3 + '. ' + $('#DS3USBName').html() + '</option>').appendTo('#DS3USBList').data("index", i);
            break;
        case 6:
            d3++;
            $('<option>' + d3 + '. ' + $('#PSMOVE').html() + '</option>').appendTo('#DS3USBList').data("index", i);
            break;
        default:
            break
        }
    }
    if (d3 == 0)
    {
        $('#DS3USBList').html('<option>' + $('#NoDS3USB').html() + '</option>')
    }
    else
    {
        var ud = Devices['nodes'][$("#DS3USBList :selected").data('index')];
        var cd = Devices['nodes'][$("#DS3USBList :selected").data('index')].controllers[0];
        $('#ds3addr').html(ud.BDAddr[0].toString(16) + '.' + ud.BDAddr[1].toString(16) + '.' + ud.BDAddr[2].toString(16) + '.' + ud.BDAddr[3].toString(16) + '.' + ud.BDAddr[4].toString(16) + '.' + ud.BDAddr[5].toString(16));
        $('#DS3MAC').html(cd.BDAddr[0].toString(16) + '.' + cd.BDAddr[1].toString(16) + '.' + cd.BDAddr[2].toString(16) + '.' + cd.BDAddr[3].toString(16) + '.' + cd.BDAddr[4].toString(16) + '.' + cd.BDAddr[5].toString(16))
    }
    if (pg == 0)
    {
        $('#PSPGoList').html('<option>' + $('#NoPSPGo').html() + '</option>')
    }
    else
    {
    }
}
function DeviceChange()
{
    Devices = GetDevices();
    displayDevice()
}
