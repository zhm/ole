
module("Delete Feature");

test("test DeleteFeature constructor and methods", 5, function() {

    var result = "";
    var editor = new OpenLayers.Editor(null, {
        status: function(options) {return options.content }
    });
    var deleteFeature = new OpenLayers.Editor.Control.DeleteFeature(editor.editLayer);
    var geo = wkt.read("GEOMETRYCOLLECTION(POLYGON((618790.43610598 265184.58711928,623253.97119041 265203.42060065,621055.270819361 264052.16976258956,618790.43610598 265184.58711928)),POLYGON((621055.270819361 264052.16976258956,623574.14037368 262792.73498543,618865.77003145 262905.73587364,621055.270819361 264052.16976258956)))");

    editor.editLayer.destroyFeatures();
    editor.map.addControl(deleteFeature);

    ok(deleteFeature instanceof OpenLayers.Editor.Control.DeleteFeature,
        "new deleteFeature returns OpenLayers.Editor.Control.DeleteFeature object.");

    ok(deleteFeature.map instanceof OpenLayers.Map,
        "deleteFeature.map returns OpenLayers.Map object.");

    result = deleteFeature.deleteFeature();
    equals(result, "oleDeleteFeatureSelectFeature",
        "deleteFeature without selected features");

    
    editor.editLayer.addFeatures(geo);
    equals(editor.editLayer.features.length, 2,
        "editor.editLayer contains 2 features");

    editor.editLayer.selectedFeatures.push(geo[0]);
    deleteFeature.deleteFeature();
    equals(editor.editLayer.features.length, 1,
        "1 feature deleted, editor.editLayer contains 1 features");


});