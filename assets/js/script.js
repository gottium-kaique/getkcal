const $ = selector => document.querySelector(selector)
const form = $("#form")

const getInputNumberValue = id => +$(`#${id}`).value
const getSelectedValue = id => {
  const { options, selectedIndex } = $(`#${id}`)
  return options[selectedIndex].value
}

form.onsubmit = event => {
  event.preventDefault()
  const result = $("#result")

  const age = getInputNumberValue("age")
  const height = getInputNumberValue("height")
  const weight = getInputNumberValue("weight")

  if (!(age || height || weight)) {
    return result.innerHTML = "<h2>Preencha os campos!</h2>"
  }

  const gender = getSelectedValue("gender")
  const activityLevel = getSelectedValue("activity_level")


  //Taxa Metabólica Basal
  
  const tmb = Math.round(
    gender === "female"
    ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
    : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
  )

  const maintenance = Math.round(tmb * +activityLevel)

  const loseWeight = maintenance - 450
  const gainWeight = maintenance + 450

  const layout = `
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
        </li>
      </ul>
    </div>
  `
  result.innerHTML = layout
}
