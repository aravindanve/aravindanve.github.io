var page = require('webpage').create(),
    system = require('system'),
    mmToInch = 0.0393701,
    inchToPx = 96;

var url = 'resume/index.html',
    output = 'resume.pdf',
    size = ['210mm', '297mm', '18mm', '9mm'],
    viewport = ['1280', '720'],
    scale = 0.96;

function sizeToPx(str, scale) {
    scale = scale || 1;

    if ('mm' === str.substr(-2)) {
        return str.substr(0, str.length - 2) * mmToInch * inchToPx * scale;
    } else if ('cm' === str.substr(-2)) {
        return str.substr(0, str.length - 2) * mmToInch * 10 * inchToPx * scale;
    } else if ('in' === str.substr(-2)) {
        return str.substr(0, str.length - 2) * inchToPx * scale;
    } else {
        return str * scale;
    }
}

function savePdf() {
    var pageWidth = sizeToPx(size[0], scale),
        pageHeight = sizeToPx(size[1], scale),
        marginTop = sizeToPx(size[2], scale),
        marginLeft = sizeToPx(size[3], scale),
        margin = {
            top: marginTop,
            right: marginLeft,
            bottom: marginTop,
            left: marginLeft
        };

        page.paperSize = {
            width: pageWidth,
            height: pageHeight,
            margin: margin
        };

        page.viewportSize = {
            width: sizeToPx(viewport[0]),
            height: sizeToPx(viewport[1])
        };

        page.open(url, function (status) {
            if (status !== 'success') {
                console.log('error opening page');
                phantom.exit(1);

            } else {
                window.setTimeout(function () {
                    page.render(output);
                    phantom.exit();
                }, 200);
            }
        });
}

// fetch page & save
window.setTimeout(function () {
    savePdf();
});


// eof
