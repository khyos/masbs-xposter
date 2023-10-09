let postOrchestrator;

document.addEventListener('DOMContentLoaded', onLoad, false);

function onLoad() {
    const updateSettingsBtn = document.getElementById('updateSettingsBtn');
    updateSettingsBtn.addEventListener('click', updateSettings);

    const form = document.getElementById('form');
    form.addEventListener('submit', submitForm);

    postOrchestrator = new masbsxposter.PostOrchestrator();
    initSettings();
}

function initSettings() {
    const mastodonInstanceURLInput = document.getElementById('mastodonInstanceURL');
    mastodonInstanceURLInput.value = localStorage.getItem('mastodonInstanceURL');
    const mastodonAppTokenInput = document.getElementById('mastodonAppToken');
    mastodonAppTokenInput.value = localStorage.getItem('mastodonAppToken');
    const bsIdentifierInput = document.getElementById('bsIdentifier');
    bsIdentifierInput.value = localStorage.getItem('bsIdentifier');
    const bsAppPasswordInput = document.getElementById('bsAppPassword');
    bsAppPasswordInput.value = localStorage.getItem('bsAppPassword');

    initializeAgents();
}

function submitForm(event) {
    event.preventDefault();
    const text = document.getElementById('text');
    const post = new masbsxposter.Post();
    post.text = text.value;
    postOrchestrator.post(post);
}

function updateSettings() {
    localStorage.setItem('mastodonInstanceURL', document.getElementById('mastodonInstanceURL').value);
    localStorage.setItem('mastodonAppToken', document.getElementById('mastodonAppToken').value);
    localStorage.setItem('bsIdentifier', document.getElementById('bsIdentifier').value);
    localStorage.setItem('bsAppPassword', document.getElementById('bsAppPassword').value);

    initializeAgents();
}

function initializeAgents() {
    const userConfig = {
        'mastodon': {
            'url': localStorage.getItem('mastodonInstanceURL'),
            'appToken': localStorage.getItem('mastodonAppToken')
        },
        'bluesky': {
            'handle': localStorage.getItem('bsIdentifier'),
            'appPassword': localStorage.getItem('bsAppPassword')
        }
    }

    postOrchestrator.initializeAgents(['bluesky', 'mastodon'], userConfig);
}