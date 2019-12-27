#version 330

uniform bool bPoints;

struct Properties
{
	float alpha;
};
uniform Properties prop;

in vec4 vertexColor;
out vec4 fragColor;

void main(void)
{
	vec4 color = vertexColor;

	if (bPoints)
	{
		// Calculate normal from coord
		vec2 norm = gl_PointCoord * 2.0 - vec2(1.0);
		float mag = dot(norm, norm);
		if (mag > 1.0)
			discard; // Kill pixels outside point

		color.a = 1.0 - mag;
		color = clamp(color, 0.0, 1.0);
	}
	else
	{
		color.a *= prop.alpha;
		color = clamp(color, 0.0, 1.0);
	}

	fragColor = color;
}
