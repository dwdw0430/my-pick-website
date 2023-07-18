import React from 'react';

function Test() {
  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-white text-2xl font-bold">Your Website Name</div>
        <ul class="flex">
  <li class="mr-6">
    <a class="text-blue-500 hover:text-blue-800" href="#">Active</a>
  </li>
  <li class="mr-6">
    <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
  </li>
  <li class="mr-6">
    <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
  </li>
  <li class="mr-6">
    <a class="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
  </li>
</ul>
      </nav>
    </header>
  );
}

export default Test;