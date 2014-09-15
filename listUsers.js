/**
 * ListUsers.js
 *
 * Enumerates all users in a certain group
 * @author: [[w:User:Fubuki風吹]]
 */
 
$(function() {
    if (!$('.listusers').length) return;
    var listUsers = window.listUsers || {
        talk: true,
        contribs: false,
        editcount: false,
        limit: 10,
        active: true
    },
    augroups = ['bot', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper', 'rollback', 'chatmoderator'];
    function getUsers(group) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'allusers',
            augroup: group,
            auprop: 'editcount',
            aulimit: listUsers.limit,
            format: 'json'
        }, function(data) {
            $('.listusers#' + group).html('<ul></ul>');
            var au = data.query.allusers, html = '';
            if (au[0].id == 0) {
                $('.listusers#' + group).html('No users found in the ' + group + ' group.');
            } else {
                for (var i in au) {
                    var user = au[i].name,
                        enc = encodeURIComponent(user);
                    html += '<li><a href="/wiki/User:' + enc + '">' + user + '</a>';
                    if (listUsers.talk) {
                        html += ' <a href="/wiki/User_talk:' + enc + '">(talk)</a>';
                    }
                    if (listUsers.contribs) {
                        html += ' <a href="/wiki/Special:Contributions/' + enc + '">(contribs)</a>';
                    }
                    if (listUsers.editcount) {
                        html += ' ' + au[i].editcount + 'edits.';
                    }
                    html += '</li>';
                }
            }
            $('.listusers#' + group + ' ul').html(html);
        });
    }
    for (var i in augroups) {
        $('.listusers').each(function() {
            switch ($(this).attr('id')) {
                case augroups[i]: getUsers(augroups[i]);
                    break;
                case '':
                case undefined: $(this).html('No user group found.');
                    break;
            }
        });
    }
    if (window.listUsers.customgroups) {
        csgroups = window.listUserscustomgroups;
        for (var i in csgroups) {
            $('.listusers').each(function() {
                switch ($(this).attr('id')) {
                    case csgroups[i]: getUsers(csgroups[i]);
                        break;
                    case '':
                    case undefined: $(this).html('No user group found.');
                        break;
                }
            });
        }
    }
});
