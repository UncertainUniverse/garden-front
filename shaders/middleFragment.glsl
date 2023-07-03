const middleFragment  = `
  varying vec3 vNormal;
  varying float vDistort; 
  uniform float uIntensity;
  uniform float uHue;
  uniform float uOpacity;
  uniform float uTime;
  vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }    
  void main() {
  float distort = vDistort * uIntensity;

   vec3 brightness = vec3(0.25, 0.25, 0.25);
  vec3 contrast = vec3(0.25, 0.25, 0.25);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.1, 0.2);

  vec3 color = cosPalette(uHue + distort, brightness, contrast, oscilation, phase);

  gl_FragColor = vec4(color, uOpacity);
  }  
`
  export default middleFragment