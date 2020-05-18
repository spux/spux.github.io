import { html, render, Component } from '/web_modules/spux.js'

function dataIslands () {
  return Array.from(
    document.querySelectorAll('[type="application/ld+json"]')
  ).map(island => JSON.parse(island.innerText))
}

class App extends Component {
  constructor (props) {
    super(props)
    const data = dataIslands()
    var qs
    if (data && data[0] && data[0]['urn:string:queryString']) {
      qs = data[0]['urn:string:queryString']
    }
    this.state = {
      items: [],
      sub:
        new URLSearchParams(window.location.search).get('r') ||
        new URLSearchParams(qs).get('r') ||
        'EarthPorn'
    }
  }

  updateStories (items) {
    this.setState({ items: items })
  }

  componentDidMount () {
    let limit = 100
    var items = []
    const that = this

    fetch(
      'https://www.reddit.com/r/' + this.state.sub + '/.json?limit=' + limit
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          )
          return
        }

        response.json().then(function (data) {
          var children = data.data.children

          children.forEach((k, v) => {
            let title = k.data.title
            let url = k.data.url
            let thumbnail = k.data.thumbnail
            items.push({ title: title, url: url, thumbnail: thumbnail })
          })
          that.updateStories(items)
        })
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err)
      })
  }

  render () {
    const Img = props => {
      if (props.src && props.src !== 'self') {
        return html`
          <img src="${props.src}" />
        `
      } else {
        return
      }
    }

    const RedditComponent = props => {
      let col = props.item % 5 == 4 ? '' : '<DIV />'
      if (props.item % 5 === 4) {
        return html`
          <div class="card col">
            <${Img} src="${props.thumbnail}" />
            <h4>${props.title}</h4>
            <p>
              <a href="${props.url}" target="_blank">Click For Full Story</a>
            </p>
          </div>
          <hr />
        `
      } else {
        return html`
          <div class="card col">
            <${Img} src="${props.thumbnail}" />
            <h4>${props.title}</h4>
            <p>
              <a href="${props.url}" target="_blank">Click For Full Story</a>
            </p>
          </div>
        `
      }
    }

    return html`
      <h2>Reddit ${this.state.sub}</h2>
      <hr />

      <div>
        ${this.state.items.map((item, i) => {
          return html`
            <${RedditComponent}
              title="${item.title}"
              url="${item.url}"
              thumbnail="${item.thumbnail}"
              item="${i}"
            />
          `
        })}
      </div>
    `
  }
}

render(
  html`
    <${App} />
  `,
  document.body
)
