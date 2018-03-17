
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // No tabs or host permissions needed!
  if (request.from == 'content_script') {
	  chrome.tabs.getSelected(null, function(tab) {
		 chrome.tabs.remove(tab.id); 
	  });
  }
});