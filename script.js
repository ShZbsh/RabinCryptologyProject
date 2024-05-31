function calculateModulo() {
    // Get input values
    var publicKey = document.getElementById("publicKey").value;
    var plaintext = document.getElementById("plaintext").value;

    // Check if both values are provided
    if (publicKey === "" || plaintext === "") {
        alert("Внесете ги двата вредности.");
        return;
    }

    // Perform the calculation: plaintext ^ 2 modulo publicKey
    var result = (Math.pow(plaintext, 2) % publicKey).toString();

    // Display the result
    document.getElementById("result").innerHTML = "Result: " + result;
}
//extended euclidean algorithm


// Define the egcd function
function egcd(a, b) {
    if (a < b) [a, b] = [b, a];
    let s = 0, old_s = 1;
    let t = 1, old_t = 0;
    let r = b, old_r = a;
    while (r != 0) {
        let q = Math.floor(old_r / r);
        [r, old_r] = [old_r - q * r, r];
        [s, old_s] = [old_s - q * s, s];
        [t, old_t] = [old_t - q * t, t];
    }

    // Return the results
    return {
        bezoutCoefS: old_s,
        bezoutCoefT: old_t,
        gcd: old_r,
        quotByGCD: [s, t]
    };
}

// Function to update the resultEGCD element
function updateResultEGCD() {
    // Get the values from input elements with ids 'p' and 'q'
    const pValue = parseInt(document.getElementById('p').value, 10);
    const qValue = parseInt(document.getElementById('q').value, 10);

    if (p < q) {
        [p, q] = [q, p];


    }
    // Calculate the EGCD
    const result = egcd(pValue, qValue);

    // Update the inner HTML of the resultEGCD element
    document.getElementById('resultEGCD').innerHTML = `
        Безоут коефииенти на [${p},${q}] се ${result.bezoutCoefS}, ${result.bezoutCoefT} соодветно <br>
       
    `;

}

// Add event listener to the egcdButton
document.getElementById('egcdButton').addEventListener('click', updateResultEGCD);

function calculateMpMq(p, q, c) {
    p = parseInt(document.getElementById('p').value, 10);
    q = parseInt(document.getElementById('q').value, 10);
    if (p < q) {
        [p, q] = [q, p];


    }
    c = parseInt(document.getElementById('encrypted').value, 10);
    let m_p = (Math.pow(c, (p + 1) / 4) % p).toString()
    console.log(Math.pow(c, (p + 1) / 4) % p)
    let m_q = (Math.pow(c, (q + 1) / 4) % q).toString()
    document.getElementById('mpmq').innerHTML = `
        m_p = ${m_p},
        m_q = ${m_q}
    `;
}
document.getElementById('calculateMpMq').addEventListener('click', calculateMpMq);

function calculateRS(p, q, c) {
    p = parseInt(document.getElementById('p').value, 10);
    q = parseInt(document.getElementById('q').value, 10);
    if (p < q) {
        [p, q] = [q, p];


    }
    let n = p * q
    c = parseInt(document.getElementById('encrypted').value, 10);
    let m_p = (Math.pow(c, (p + 1) / 4) % p).toString()
    let m_q = (Math.pow(c, (q + 1) / 4) % q).toString()
    const result = egcd(p, q);
    let y_p = result.bezoutCoefS
    let y_q = result.bezoutCoefT
    let r = (y_p * p * m_q + y_q * q * m_p) % n
    r = Math.abs(r)
    let minusr = Math.abs(n - r)
    let s = (y_p * p * m_q - y_q * q * m_p) % n
    s = Math.abs(s)
    let minuss = Math.abs(n - s)
    document.getElementById('rs').innerHTML = `
    r = ${r},
    -r = ${minusr},
    s = ${s},
    -s = ${minuss}
`;
    return {
        r: r,
        s: s,
        minusr: minusr,
        minuss: minuss
    }


}
document.getElementById('calculateRS').addEventListener('click', calculateRS);

function Decryption() {
    p = parseInt(document.getElementById('p').value, 10);
    q = parseInt(document.getElementById('q').value, 10);
    // Swap values if q is greater than p
    if (p < q) {
        [p, q] = [q, p];


    }
    // Check conditions
    if (p % 4 !== 3 || q % 4 !== 3) {
        alert("Внесовте невалидни вредности за p и q, треба да важат: p mod 4 = 3 and q mod 4 = 3. Внесете нови вредности");
        
    } else {
        let n = p * q
        c = parseInt(document.getElementById('encrypted').value, 10);
        let m_p = (Math.pow(c, (p + 1) / 4) % p).toString()
        let m_q = (Math.pow(c, (q + 1) / 4) % q).toString()
        const result = egcd(p, q);
        let y_p = result.bezoutCoefS
        let y_q = result.bezoutCoefT
        let r = (y_p * p * m_q + y_q * q * m_p) % n
        r = Math.abs(r)
        let minusr = Math.abs(n - r)
        let s = (y_p * p * m_q - y_q * q * m_p) % n
        s = Math.abs(s)
        let minuss = Math.abs(n - s)
        document.getElementById('decryption').innerHTML = `
    Можни решенија се ${r}, ${minusr}, ${s}, ${minuss}
`;
    }
}
document.getElementById('decrypt').addEventListener('click', Decryption);

