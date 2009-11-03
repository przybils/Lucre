var ns = (navigator.appName.indexOf("Netscape") != - 1);
var d = document;
function FloatDiv(id, sx, sy)
{
    var el = d.getElementById ? d.getElementById(id) : d.all ? d.all[id] : d.layers[id];
    var px = document.layers ? "" : "px";
    window[id + "_obj"] = el;
    if(d.layers)el.style = el;
    el.cx = el.sx = sx;
    el.cy = el.sy = sy;
    el.sP = function(x, y)
    {
        this.style.left = x + px;
        this.style.top = y + px;
    }
    ;

    el.floatIt = function()
    {
        var pX, pY;
        pX = (this.sx >= 0) ? 0 : ns ? innerWidth :
        document.documentElement && document.documentElement.clientWidth ?
        document.documentElement.clientWidth : document.body.clientWidth;
        pY = ns ? pageYOffset : document.documentElement && document.documentElement.scrollTop ?
        document.documentElement.scrollTop : document.body.scrollTop;
        if(this.sy < 0)
        pY += ns ? innerHeight : document.documentElement && document.documentElement.clientHeight ?
        document.documentElement.clientHeight : document.body.clientHeight;
        this.cx += (pX + this.sx - this.cx) / 8;
        this.cy += (pY + this.sy - this.cy) / 8;
        this.sP(this.cx, this.cy);
        setTimeout(this.id + "_obj.floatIt()", 40);
    }
    return el;
}

function showShareButton()
{
    var el = document.getElementById("divTopLeft");
    el.style.visibility = "visible";
    el.zIndex = "2000";
}

function hideShareButton()
{
    document.getElementById("divTopLeft").style.visibility = "hidden";
}

function shareSelectedText()
{
    var txt = '';
    if (window.getSelection)
    {
        txt = window.getSelection();
    }
    else if (document.getSelection)
    {
        txt = document.getSelection();
    }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
    }
    else return;
    
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            t = 'Lat: ' + position.coords.latitude + ', Long: ' + position.coords.longitude;
            u = 'http://maps.google.com/maps?q=' + position.coords.latitude + ',+' + position.coords.longitude + '+(' + txt + ')&iwloc=A&hl=en';
            window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,width=626,height=436');
        }
        );
    }
    return false;


    alert(txt);
}

function shareWebsite()
{
    u = location.href;
    t = document.title;
    window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function shareLocation()
{
    netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            t = 'Lat: ' + position.coords.latitude + ', Long: ' + position.coords.longitude;
            u = 'http://www.openstreetmap.org/?mlat=' + position.coords.latitude + '&mlon=' + position.coords.longitude + '&zoom=15';
            window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,width=626,height=436');
        }
        );
    }
    return false;
}
