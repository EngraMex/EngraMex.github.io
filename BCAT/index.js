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
    "Truput Cobrado": { valor: 67, color: "green" },
    "Gastos de Operacion por Cubrir": { valor: 33, color: "gray" },
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
        labels: [    "L 07", "M 08", "W 09", "J 10", "V 11", 
                     "L 14", "M 15", "W 16", "J 17", "V 18", 
                     "L 21", "M 22", "W 23", "J 24", "V 25", 
                     /*"L 28","M 29", "W 30"*/],
        datasets: [
            {
                label: "PROYECTOS ENTREGADOS",
                data: [
                    2, //L 7
                    4, //M 8
                    4, //W 9
                    1, //J 10
                    2, //V 11
                    3, //L 14
                    1, //M 15
                    2, //W 16
                    0, //J 17
                    0, //V 18
                    2, //L 21
                    3, //L 22
                    1, //M 23

                     ],
                backgroundColor: [
                                    "rgba(60, 255, 0, 0.4)",   // VERDE L 7
                                    "rgba(54, 197, 10, 0.7)",   // VERDE M 8
                                    "rgba(54, 197, 10, 0.7)",   // VERDE W 9
                                    "rgba(235, 248, 5, 0.3)",   // AMARILLO J 10
                                    "rgba(60, 255, 0, 0.4)",   // VERDE V 11
                                    "rgba(60, 255, 0, 0.5)",   // VERDE L 14
                                    "rgba(235, 248, 5, 0.3)",   // AMARILLO M 15
                                    "rgba(60, 255, 0, 0.4)",   // VERDE W 16
                                    "rgba(60, 255, 0, 0.4)",   // VERDE J 17
                                    "rgba(60, 255, 0, 0.4)",   // VERDE V 18
                                    "rgba(60, 255, 0, 0.5)",   // VERDE L 21
                                    "rgba(60, 255, 0, 0.5)",   // VERDE M 22
                                    "rgba(235, 248, 5, 0.3)",   // AMARILLO W 23
                                  ],
                borderColor: [ 
                                    "rgba(60, 255, 0, 1)",   // VERDE L 7
                                    "rgba(54, 197, 10, 1)",   // VERDE M 8
                                    "rgba(54, 197, 10, 1)",   // VERDE W 9
                                    "rgba(235, 248, 5, 1)",   // AMARILLO J 10
                                    "rgba(60, 255, 0, 1)",   // VERDE V 11
                                    "rgba(60, 255, 0, 1)",   // VERDE L 14
                                    "rgba(235, 248, 5, 1)",   // AMARILLO M 15
                                    "rgba(60, 255, 0, 1)",   // VERDE W 16
                                    "rgba(60, 255, 0, 1)",   // VERDE W 16
                                    "rgba(60, 255, 0, 1)",   // VERDE W 16
                                    "rgba(60, 255, 0, 1)",   // VERDE L 14
                                    "rgba(60, 255, 0, 1)",   // VERDE L 22
                                    "rgba(235, 248, 5, 1)",   // AMARILLO M 23
                    ],
                borderWidth: 2,
            },
            {
                type: "line",
                label: "Objetivo diario",
                data: new Array(16).fill(2),
                borderColor: "rgba(14, 255, 0, 1)",
                backgroundColor: "rgba(14, 255, 0, 0.2)",
                fill: false,
            },
            {
                type: "line",
                label: "Objetivo 2030",
                data: new Array(16).fill(6),
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
