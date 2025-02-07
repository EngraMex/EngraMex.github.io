var nuevoId = function (canvasId, width, height, valores) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = width;
    this.canvas.height = height;
    this.radio = Math.min(this.canvas.width / 2, this.canvas.height / 2);
    this.context = this.canvas.getContext("2d");
    this.valores = valores;
    this.tamanoDonut = 0;

    this.dibujar = function () {
        this.total = this.getTotal();
        let valor = 0;
        let inicioAngulo = 0;
        let angulo = 0;

        for (var i in this.valores) {
            valor = this.valores[i]["valor"];
            let color = this.valores[i]["color"];
            angulo = (2 * Math.PI * valor) / this.total;

            this.context.fillStyle = color;
            this.context.beginPath();
            this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2);
            this.context.arc(this.canvas.width / 2, this.canvas.height / 2, this.radio, inicioAngulo, inicioAngulo + angulo);
            this.context.closePath();
            this.context.fill();
            inicioAngulo += angulo;
        }
    };

    this.dibujarDonut = function (tamano, color) {
        this.tamanoDonut = tamano;
        this.dibujar();

        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(this.canvas.width / 2, this.canvas.height / 2, this.radio * tamano, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    };

    this.ponerPorCiento = function (color) {
        let valor = 0;
        let etiquetaX = 0;
        let etiquetaY = 0;
        let inicioAngulo = 0;
        let angulo = 0;
        let texto = "";
        let incrementar = 0;

        if (this.tamanoDonut) incrementar = (this.radio * this.tamanoDonut) / 2;

        this.context.font = "bold 23pt Calibri";
        this.context.fillStyle = color;

        for (var i in this.valores) {
            valor = this.valores[i]["valor"];
            angulo = (2 * Math.PI * valor) / this.total;

            etiquetaX = this.canvas.width / 2 + (incrementar + this.radio / 2) * Math.cos(inicioAngulo + angulo / 2);
            etiquetaY = this.canvas.height / 2 + (incrementar + this.radio / 2) * Math.sin(inicioAngulo + angulo / 2);

            texto = Math.round((100 * valor) / this.total);

            if (etiquetaX < this.canvas.width / 2) etiquetaX -= 20;
            etiquetaY += 12; // Corrección

            this.context.beginPath();
            this.context.fillText(texto + "%", etiquetaX, etiquetaY);
            this.context.stroke();

            inicioAngulo += angulo;
        }
    };

    this.getTotal = function () {
        let total = 0;
        for (var i in this.valores) {
            total += this.valores[i]["valor"];
        }
        return total;
    };

    this.ponerLeyenda = function (leyenda2Id) {
        let codigoHTML = "<ul class='leyenda'>";

        for (var i in this.valores) {
            codigoHTML += "<li><span style='background-color:" + this.valores[i]["color"] + "'></span>" + i + "</li>";
        }
        codigoHTML += "</ul>";
        document.getElementById(leyenda2Id).innerHTML = codigoHTML;
    };
};

var valores = {
    "Truput Cobrado": { valor: 7, color: "green" },
    "Gastos de Operacion por Cubrir": { valor: 93, color: "gray" },
};

var pastel = new nuevoId("canvas2", 400, 300, valores);
pastel.dibujarDonut(0.3, "white");
pastel.ponerPorCiento("white");
pastel.ponerLeyenda("leyenda2");

// ------------------------------------------------------------------------------------------------

var aguja = document.getElementById("aguja");

function actualizarVelocidad(velocidad) {
    // Ajustamos la escala de 0-2000 a -90 a 90 grados, con 0 en el lado izquierdo (-90 grados)
    let angulo = -90 + ((velocidad) * 180) / 2000;
    aguja.style.transform = `rotate(${angulo}deg)`;

    if (velocidad <= 700) {
        aguja.style.background = "red";
    } else if (velocidad <= 1400) {
        aguja.style.background = "yellow";
    } else {
        aguja.style.background = "green";
    }
}



var ctx = document.getElementById("ProyectosEntregados");

var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["L 20", "M 21", "W 22", "J 23", "V 24", "L 27", "M 28", "W 29", "J 30", "V 31", "L 03", "M 04", "W 05", "J 06", "V 07", ],
        datasets: [
            {
                label: "PROYECTOS ENTREGADOS",
                data: [1,  /* L 20 */
                       2,  /* M 21 */
                       1,  /* W 22 */
                       1,  /* J 23 */
                       4,  /* V 24 */
                       3,  /* L 27 */
                       2,  /* M 28 */
                       1,  /* W 29 */
                       0,  /* J 30 */
                       3,  /* V 31 */
                       0,  /* L 03 */
                       3,  /* M 04 */
                       3,  /* W 05 */
                       0,  /* J 06 */
                       0,  /* V 07 */ ],
                backgroundColor: ["rgba(231, 255, 0, 0.2)", // AMARILLO L 20
                                  "rgba(14, 255, 0, 0.2)",  // VERDE M21
                                  "rgba(231, 255, 0, 0.2)", // AMARILLO W 22
                                  "rgba(231, 255, 0, 0.2)", // AMARILLO J 23
                                  "rgba(16, 255, 0, 0.4)",  // VERDE V 24
                                  "rgba(16, 255, 0, 0.3)",  // VERDE L 27
                                  "rgba(16, 255, 0, 0.2)",  // VERDE M 28
                                  "rgba(231, 255, 0, 0.2)", // AMARILLO w 29
                                  "rgba(255, 0, 0, 0.2)",   // ROJO J 30
                                  "rgba(16, 255, 0, 0.3)",  // VERDE V 31
                                  "rgba(255, 0, 0, 0.2)",   // ROJO L 03
                                  "rgba(16, 255, 0, 0.3)",  // VERDE M 04
                                  "rgba(16, 255, 0, 0.3)",  // VERDE W 05
                                  "rgba(231, 255, 0, 0.2)", // AMARILLO J 06
                                  "rgba(255, 0, 0, 0.2)",   // ROJO V 07
                                  ],
                borderColor: ["rgba(231, 255, 0, 1)", // AMARILLO L 20
                              "rgba(14, 255, 0, 1)",  // VERDE M21
                              "rgba(231, 255, 0, 1)", // AMARILLO W 22
                              "rgba(231, 255, 0, 1)", // AMARILLO J 23
                              "rgba(16, 255, 0, 1)",  // VERDE V 24
                              "rgba(16, 255, 0, 1)",  // VERDE L 27
                              "rgba(16, 255, 0, 1)",  // VERDE M 28
                              "rgba(231, 255, 0, 1)", // AMARILLO w 29
                              "rgba(255, 0, 0, 1)",   // ROJO J 30
                              "rgba(16, 255, 0, 1)",  // VERDE V 31
                              "rgba(255, 0, 0, 1)",   // ROJO L 03
                              "rgba(16, 255, 0, 1)",  // VERDE M 04
                              "rgba(16, 255, 0, 1)",  // VERDE W 05
                              "rgba(231, 255, 0, 1)", // AMARILLO J 06
                              "rgba(255, 0, 0, 1)",   // ROJO V 07
                    ],
                borderWidth: 2,
            },
            {
                type: "line",
                label: "Objetivo diario",
                data: new Array(15).fill(2),
                borderColor: "rgba(14, 255, 0, 1)",
                backgroundColor: "rgba(14, 255, 0, 0.2)",
                fill: false,
            },
            {
                type: "line",
                label: "Objetivo 2030",
                data: new Array(15).fill(6),
                borderColor: "rgba(39, 101, 245, 1)",
                backgroundColor: "rgba(39, 101, 245, 0.2)",
                fill: false,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});
