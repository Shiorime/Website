var vertexShaderTest =
[
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '   fragColor = vertColor;',
    '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join("\n");

var fragmentShaderText = 
[
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    '   gl_FragColor = vec4(fragColor, 1.0);', //Changing this changes the colour of the triangle
    '}'
].join("\n");

var InitDemo = function(){
    var canvas = document.getElementById("game-surface")
    var gl = canvas.getContext("webgl");

    if(!gl){
        console.log("WebGL not support without using experimental WebGL");
        gl = canvas.getContext("experimental-webgl");
    }

    if (!gl){
        alert("Your browser does not support WebGL");
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //
    // Create Shaders
    //
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTest);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        console.error("Syntax Error in vertexShaderText!", gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
        console.error("Syntax Error in vertexShaderText!", gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("Link Program Error", gl.getProgramInfoLog(program));
        return;
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.error("Validating Program Error", gl.getProgramInfoLog(program));
        return;
    }

    //
    // Create buffer
    //

    var triangleVertices = 
    [ // X, Y       R, G, B
        0.0, 0.5,   1.0, 1.0, 0.0,
        -0.5, -0.5, 0.7, 0.0, 1.0,
        0.5, -0.5,  0.1, 1.0, 0.6
    ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var positionAttributeLocation = gl.getAttribLocation(program, "vertPosition");
    var colorAttributeLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
        positionAttributeLocation, //Attribute Location
        2, //Number of elements per attribute (since ours is vec2 it is 2)
        gl.FLOAT, //Type of elements
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
        0 //Offset from the beginning of a single vertex to this attribute
    );

    gl.vertexAttribPointer(
        colorAttributeLocation, //Attribute Location
        3, //Number of elements per attribute (since ours is vec3 it is 3)
        gl.FLOAT, //Type of elements
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
        2 * Float32Array.BYTES_PER_ELEMENT //Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);

    //
    //Main render loop
    //
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}