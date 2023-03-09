function getBranchAndCommit() {
    let backlogTicket = document.getElementById('issueKey').value;
    backlogTicket = backlogTicket.replace(/\[.*\]/, '');
    if (!backlogTicket) {
        clearInput();
        return null;
    }
    const backlogTicketArr = backlogTicket.split(' ').filter(Boolean);
    if (backlogTicketArr.length < 2) {
        clearInput();
        return null;
    }
    const ticketId = backlogTicketArr.shift();
    const filteredChars = backlogTicketArr.map((e) => e.replace(/[^\w\s]/g, '_'));
    const issueType = document.getElementById('feature').checked ? 'feature' : 'bugfix';
    const branchName = `${issueType}/${ticketId}-${filteredChars.map((string) => string.toLowerCase()).join('_').replace(/__/, '_')}`;
    const commitMsg = `[${ticketId}] ${backlogTicketArr.join(' ')}`;

    return { branchName, commitMsg };
}

function handleGo() {
    const data = getBranchAndCommit();
    if (!data) return;
    document.getElementById('branch').value = data.branchName;
    document.getElementById('commit').value = data.commitMsg;
}

function handleCopyBranch() {
    const branchName = getBranchAndCommit()?.branchName;
    if (!branchName) return;
    navigator.clipboard.writeText(branchName).then(function () {
        console.log('Copying to clipboard was successful!');
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}

function handleCopyCommit() {
    const commitMsg = getBranchAndCommit()?.commitMsg;
    if (!commitMsg) return;
    navigator.clipboard.writeText(commitMsg).then(function () {
        console.log('Copying to clipboard was successful!');
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}

function clearInput() {
    document.getElementById('branch').value = '';
    document.getElementById('commit').value = '';
}

const issueKey = document.getElementById('issueKey');
issueKey.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    document.getElementById('go').click();
  }
});
