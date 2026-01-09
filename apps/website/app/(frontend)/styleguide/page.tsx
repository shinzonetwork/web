export default function Styleguide() {
    return (
        <div className="wrapper px-4 grid grid-cols-12 py-24">
            <div className="col-span-12 richtext py-12">
                <h2>What is Shinzō? Header 2</h2>
                <h3>Header 3</h3>
                <h4>Header 4</h4>
                <h5>Header 5</h5>
                <h6>Header 6</h6>
                <p>Paragraph 1</p>
                <p>Lorem ipsum <a href="#">Inline Link</a>, consectetur adipiscing elit. Maecenas non eros sem. Mauris non est a lorem mattis maximus sit amet vel tortor. Nunc ultrices fringilla lectus, et pharetra turpis ornare et. Donec rhoncus ante vitae sem luctus, eget auctor erat cursus. Suspendisse enim nunc, lacinia ac justo convallis, scelerisque aliquam eros. Curabitur auctor, orci ut ultricies faucibus, est nunc ultrices elit, fringilla vestibulum mauris felis et sem. Cras egestas porta est, nec elementum elit varius sit amet. Suspendisse cursus dolor quam, nec volutpat tortor porta at.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum, nunc ac vestibulum feugiat, eros magna placerat ligula, vitae placerat nunc elit id purus. Sed efficitur commodo lacinia. Nam non pretium ligula. Nulla facilisi. Fusce egestas dolor sed mattis dictum. Maecenas imperdiet ullamcorper nibh, eget dapibus lectus sagittis a. Praesent neque leo, dignissim id venenatis at, suscipit id libero.</p>
                <p>Nulla feugiat felis arcu, sit amet scelerisque ante tincidunt et. Pellentesque sit amet commodo metus. Suspendisse ac rhoncus sem. Sed eget faucibus urna. Morbi porta aliquam eros, a scelerisque mi malesuada ac. Fusce ornare sodales tincidunt. Sed blandit aliquet mauris, in pharetra lectus.</p>
                <ul>
                    <li>List item 1</li>
                    <li>List item 2</li>
                    <li>List item 3</li>
                </ul>
                <ol>
                    <li>List item 1</li>
                    <li>List item 2</li>
                    <li>List item 3</li>
                </ol>
                <table>
                    <thead><tr><th>Header_1</th><th>Header_2</th><th>Header_3</th></tr></thead>
                    <tbody><tr><td>Cell_1</td><td>Cell_2</td><td>Cell_3</td></tr><tr><td>Cell_1</td><td>Cell_2</td><td>Cell_3</td></tr><tr><td>Cell_1</td><td>Cell_2</td><td>Cell_3</td></tr></tbody>
                    <tfoot><tr><td>Footer_1</td><td>Footer_2</td><td>Footer_3</td></tr></tfoot>
                </table>
            </div>
        </div>
    );
}
