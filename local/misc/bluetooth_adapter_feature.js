var Devices;
$(function ()
{
    SetBusy(false);
    if (VersionTool >= VER)
    {
        Devices = GetDevices();
        for (var k in Devices['nodes'])
        {
            if (Devices['nodes'][k].DeviceType == 1)
            {
                var flag = (Devices['nodes'][k].BTDongleFeature[0]);
                for (var i = 0; i < 6; i++)
                {
                    for (var j = 0; j < 8; j++)
                    {
                        if ((Devices['nodes'][k].BTDongleFeature[i] & (1 << j)) != 0)
                        {
                            $('#Featureid_' + (i * 8 + j)).html('<img src="misc/images/q_correct.png" width="12" height="12">')
                        }
                        else
                        {
                            $('#Featureid_' + (i * 8 + j)).html('<img src="misc/images/q_incorrect.png" width="12" height="12">')
                        }
                    }
                }
            }
        }
    }
});
