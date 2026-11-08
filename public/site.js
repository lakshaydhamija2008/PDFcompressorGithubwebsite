// This is an illustrative size comparison, not a PDF compression engine.
const strength = document.querySelector('#demo-strength')
if (strength) {
  const strengthValue = document.querySelector('#demo-strength-value')
  const size = document.querySelector('#demo-size')
  const saving = document.querySelector('#demo-saving')
  const updateExample = () => {
    const value = Number(strength.value)
    const sampleSize = 8.4 * (1 - 0.96 * Math.sqrt(value / 100))
    strengthValue.value = value + '%'
    size.value = sampleSize.toFixed(1) + ' MB'
    saving.textContent = '−' + Math.round((1 - sampleSize / 8.4) * 100) + '%'
  }
  strength.addEventListener('input', updateExample)
  updateExample()
}
