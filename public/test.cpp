#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define vi vector <int>
#define vl vector <ll>
#define rep(i, x, n) for (int i = x; i < n; i ++)
#define pb push_back

void solve() {
    int n, m, k; cin >> n >> m >> k;
    string s; cin >> s;

    vector <vector <bool>> dp (n + 2, vector <bool> (k + 1, false)); 
    // dp[i][j] = true if position i reachable having swum j
    dp[0][0] = true;
    rep (i, 0, n + 1) {
        rep (j, 0, k + 1) {
            if (!dp[i][j]) continue;

            // jump
            if (i == 0 || s[i - 1] == 'L') {
                for (int jump = 1; jump <= m && i + jump <= n + 1; jump ++) {
                    if (i + jump <= n && s[i + jump - 1] == 'C') continue;
                    dp[i + jump][j] = true;
                }
            }

            // swim
            if (i > 0 && i <= n && s[i - 1] == 'W' && j < k) {
                if (i + 1 <= n && s[i] != 'C') dp[i + 1][j + 1] = true;
            }

            // if swim reachable for last segment
            if (i == n && j < k && s[i - 1] == 'W') dp[i + 1][j + 1] = true; 
        }
    }

    bool ans = false;
    rep (i, 0, k + 1) {
        if (dp[n + 1][i]) {
            ans = true;
            break;
        }
    }
    cout << (ans ? "YES" : "NO") << endl;
}

int main () {
ios_base::sync_with_stdio(false); cin.tie(NULL);

    int t; cin >> t;
    while (t --) {
        solve();
    }
    return 0;
}